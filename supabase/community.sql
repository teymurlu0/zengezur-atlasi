-- ZƏNGƏZURİUM — açıq icma mesajları.
-- Supabase Dashboard → SQL Editor → New query → bütün SQL-i Run edin.
-- Təkrar işə salmaq mümkündür, mövcud mesajlar silinmir.

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Köhnə versiyada olan regex yoxlaması Azərbaycan hərflərini rədd edə bilər.
-- Bu şərt dəyişdirilir, mətn yoxlaması isə saxlanılır.
alter table public.community_posts
  drop constraint if exists community_posts_nickname_check;
alter table public.community_posts
  add constraint community_posts_nickname_check
  check (char_length(btrim(nickname)) between 2 and 24 and nickname !~ '[[:cntrl:]]');

create index if not exists community_posts_latest_idx
  on public.community_posts (created_at desc);
create index if not exists community_posts_author_recent_idx
  on public.community_posts (author_id, created_at desc);

alter table public.community_posts enable row level security;

-- Giriş etməmiş brauzer DB-yə mesaj yazmamalıdır.
revoke all on public.community_posts from anon;
grant usage on schema public to authenticated;
grant select, insert on public.community_posts to authenticated;

-- Anonim auth istifadəçisi də "authenticated" rolundadır.
drop policy if exists community_read on public.community_posts;
create policy community_read
  on public.community_posts for select to authenticated
  using (true);

drop policy if exists community_insert_own on public.community_posts;
create policy community_insert_own
  on public.community_posts for insert to authenticated
  with check ((select auth.uid()) = author_id);

-- Sadə server-side spam fasiləsi və tarix qorunması.
create or replace function public.community_post_guard()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if exists (
    select 1 from public.community_posts
    where author_id = new.author_id
      and created_at > now() - interval '10 seconds'
  ) then
    raise exception 'rate_limit';
  end if;
  new.created_at := now();
  if char_length(btrim(new.body)) < 1 or char_length(new.body) > 500 then
    raise exception 'invalid_message_length';
  end if;
  return new;
end;
$$;

drop trigger if exists community_post_guard_trigger on public.community_posts;
create trigger community_post_guard_trigger
  before insert on public.community_posts
  for each row execute function public.community_post_guard();

-- Yoxlama: 1 cədvəl göstərməlidir.
select table_schema, table_name
from information_schema.tables
where table_schema = 'public' and table_name = 'community_posts';
