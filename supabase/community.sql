-- Ayrı bir Supabase layihəsinin SQL Editor bölməsində bir dəfə icra edin.
-- İcma üzvləri e-poçtsuz anonim Auth istifadə edir; auth.user_id məcburidir.
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 2 and 24 and nickname ~ '^[[:alnum:]_ .-]+$'),
  body text not null check (char_length(btrim(body)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists community_posts_latest_idx on public.community_posts (created_at desc);
create index if not exists community_posts_author_recent_idx on public.community_posts (author_id, created_at desc);
alter table public.community_posts enable row level security;
revoke all on public.community_posts from anon;
grant select, insert on public.community_posts to authenticated;

-- İctimai mesajları bütün giriş etmiş anonim istifadəçilər görür.
drop policy if exists "community_read" on public.community_posts;
create policy "community_read" on public.community_posts for select to authenticated using (true);
-- Hər kəs yalnız öz auth ID-si ilə mesaj yaza bilər.
drop policy if exists "community_insert_own" on public.community_posts;
create policy "community_insert_own" on public.community_posts for insert to authenticated
with check ((select auth.uid()) = author_id);

-- 10 saniyəlik server-side fasilə. Mesaj tarixini saxtalaşdırmaq olmaz.
create or replace function public.community_post_guard()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if exists (
    select 1 from public.community_posts
    where author_id = new.author_id and created_at > now() - interval '10 seconds'
  ) then raise exception 'rate_limit'; end if;
  new.created_at := now();
  return new;
end;
$$;
drop trigger if exists community_post_guard_trigger on public.community_posts;
create trigger community_post_guard_trigger before insert on public.community_posts
for each row execute function public.community_post_guard();
