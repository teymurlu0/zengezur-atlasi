"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Post = {
  id: string;
  author_id: string;
  nickname: string;
  body: string;
  created_at: string;
};

type SetupState = "loading" | "ready" | "config" | "auth-error";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)?.trim();

// Yalnız publishable/anon açarından istifadə edin. Secret key heç vaxt brauzerə verilməməlidir.
const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    : null;

function authErrorMessage(error: { message: string; code?: string }): string {
  if (error.code === "anonymous_provider_disabled" || /anonymous.*(disabled|not enabled)/i.test(error.message)) {
    return "Supabase → Authentication → Providers → Anonymous Sign-Ins seçimini aktivləşdir.";
  }
  if (/invalid api key|invalid.*jwt|apikey|api key/i.test(error.message)) {
    return "Supabase publishable key və Project URL eyni layihədən olmalıdır. Vercel dəyişənlərini yoxla.";
  }
  if (/captcha/i.test(error.message)) {
    return "Supabase giriş üçün CAPTCHA tələb edir. CAPTCHA konfiqurasiyasını tamamla və ya sınaq üçün söndür.";
  }
  if (/fetch|network|failed to fetch/i.test(error.message)) {
    return "Supabase-ə bağlantı alınmadı. Şəbəkəni və Project URL-ni yoxla.";
  }
  return `Giriş xətası: ${error.message}`;
}

function postsErrorMessage(error: { message: string; code?: string }): string {
  if (error.code === "PGRST205" || error.code === "42P01" || /could not find the table|relation .* does not exist/i.test(error.message)) {
    return "community_posts cədvəli tapılmadı. SQL Editor-də community.sql faylını işə sal.";
  }
  if (error.code === "42501" || /permission denied/i.test(error.message)) {
    return "Mesajlara icazə yoxdur. SQL-də GRANT və RLS qaydalarını yenilə.";
  }
  if (error.code === "PGRST301" || /jwt.*expired/i.test(error.message)) {
    return "Sessiya müddəti bitib. Səhifəni yenilə və yenidən qoşul.";
  }
  return `Mesajları yükləmək mümkün olmadı: ${error.message}`;
}

function sendErrorMessage(error: { message: string; code?: string }): string {
  if (/rate_limit/i.test(error.message)) return "Ardıcıl mesajlar arasında 10 saniyə gözlə.";
  if (error.code === "23514") return "Ləqəb və ya mesaj verilənlər bazasının qaydalarına uyğun deyil.";
  return postsErrorMessage(error);
}

export default function CommunityChat() {
  const [setup, setSetup] = useState<SetupState>(supabase ? "loading" : "config");
  const [nick, setNick] = useState("");
  const [draftNick, setDraftNick] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [authError, setAuthError] = useState("");
  const [feedError, setFeedError] = useState("");
  const [formError, setFormError] = useState("");
  const [fetching, setFetching] = useState(false);
  const [sending, setSending] = useState(false);
  const [retry, setRetry] = useState(0);
  const userId = useRef<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const reload = useCallback(async () => {
    if (!supabase || !userId.current) return;
    setFetching(true);
    const { data, error } = await supabase
      .from("community_posts")
      .select("id,author_id,nickname,body,created_at")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) {
      console.error("CommunityChat select error", error);
      setFeedError(postsErrorMessage(error));
    } else {
      setFeedError("");
      setPosts(((data ?? []) as Post[]).reverse());
    }
    setFetching(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let mounted = true;

    async function initialize() {
      setSetup("loading");
      setAuthError("");
      setFeedError("");
      userId.current = null;

      try {
        // Əvvəl saxlanmış sessiyadan istifadə edilir; yoxdursa anonim istifadəçi yaradılır.
        const sessionResult = await client.auth.getSession();
        if (!mounted) return;
        let currentUser = sessionResult.data.session?.user ?? null;

        if (!currentUser) {
          const signIn = await client.auth.signInAnonymously();
          if (!mounted) return;
          if (signIn.error) throw signIn.error;
          currentUser = signIn.data.user;
        }
        if (!currentUser) throw new Error("Supabase istifadəçi sessiyası yaratmadı.");
        userId.current = currentUser.id;

        try {
          const stored = window.localStorage.getItem("zengezurium-nick") || "";
          if (mounted) {
            setNick(stored);
            setDraftNick(stored);
          }
        } catch {
          // Şəxsi rejimdə localStorage söndürülmüş ola bilər.
        }
        if (mounted) setSetup("ready");
      } catch (error) {
        if (!mounted) return;
        const issue = error instanceof Error ? error : new Error(String(error));
        const withCode = issue as Error & { code?: string };
        console.error("CommunityChat auth error", issue);
        setAuthError(authErrorMessage(withCode));
        setSetup("auth-error");
      }
    }

    void initialize();
    return () => {
      mounted = false;
    };
  }, [retry]);

  useEffect(() => {
    if (setup !== "ready") return;
    void reload();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void reload();
    }, 12000);
    return () => window.clearInterval(interval);
  }, [setup, reload]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [posts.length]);

  function saveNick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = draftNick.trim().replace(/\s+/g, " ");
    if (!/^[\p{L}\p{N}_ .-]{2,24}$/u.test(clean)) {
      setFormError("Ləqəb 2–24 simvol olmalı, yalnız hərf, rəqəm, boşluq, nöqtə, _ və - ehtiva etməlidir.");
      return;
    }
    setNick(clean);
    setFormError("");
    try {
      window.localStorage.setItem("zengezurium-nick", clean);
    } catch {}
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = text.trim();
    if (!supabase || setup !== "ready" || !userId.current || !nick || !body || sending) return;
    if (body.length > 500) {
      setFormError("Mesaj 500 simvoldan uzun olmamalıdır.");
      return;
    }
    setSending(true);
    setFormError("");
    const { error } = await supabase
      .from("community_posts")
      .insert({ author_id: userId.current, nickname: nick, body });
    if (error) {
      console.error("CommunityChat insert error", error);
      setFormError(sendErrorMessage(error));
    } else {
      setText("");
      await reload();
    }
    setSending(false);
  }

  return (
    <section className="community-section" id="community" aria-labelledby="community-title">
      <div className="section-intro">
        <div><span className="kicker">İCMA SÖHBƏTİ</span><h2 id="community-title">Söz sənindir.</h2></div>
        <p>Öz ləqəbinlə fikrini paylaş, başqalarının yazdıqlarını oxu.</p>
      </div>
      <div className="community-shell">
        <aside className="community-info">
          <span className="community-mark">✳</span>
          <h3>Eyni yerə fərqli baxışlar.</h3>
          <p>Bura Zəngəzur haqqında məlumat, xatirə və sualların paylaşıldığı açıq söhbət yeridir.</p>
          <div className="community-rule">
            <strong>Sadə qaydalar</strong>
            <p>Hörmətli danış, şəxsi məlumat paylaşma, təhqirdən uzaq ol. Ləqəb hesab təsdiqi deyil.</p>
          </div>
          <small>Mesajlar ictimai görünür. Özün haqqında məxfi məlumat yazma.</small>
        </aside>

        <div className="community-board">
          {setup === "config" ? (
            <div className="community-empty" role="alert">
              <strong>Supabase bağlantısı qurulmayıb</strong>
              <p>Vercel → Settings → Environment Variables bölməsində <code>NEXT_PUBLIC_SUPABASE_URL</code> və <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dəyişənlərini əlavə edib Redeploy et.</p>
            </div>
          ) : setup === "loading" ? (
            <div className="community-empty"><p>İcma söhbətinə qoşuluruq…</p></div>
          ) : setup === "auth-error" ? (
            <div className="community-empty" role="alert">
              <strong>İcma girişində xəta</strong>
              <p>{authError}</p>
              <button type="button" onClick={() => setRetry((n) => n + 1)}>Yenidən qoşul ↻</button>
            </div>
          ) : (
            <>
              <div className="community-board-top">
                <div><strong>İcma söhbəti</strong><span>Son 60 mesaj · 12 saniyədən bir yenilənir</span></div>
                <button type="button" disabled={fetching} onClick={() => void reload()}>{fetching ? "Yenilənir…" : "Yenilə ↻"}</button>
              </div>

              {!nick ? (
                <form className="community-nick-form" onSubmit={saveNick}>
                  <label htmlFor="community-nickname">Hansı ləqəblə görünmək istəyirsən?</label>
                  <div>
                    <input id="community-nickname" value={draftNick} onChange={(e) => setDraftNick(e.target.value)} maxLength={24} placeholder="Ləqəbin" required />
                    <button type="submit">Daxil ol</button>
                  </div>
                </form>
              ) : (
                <div className="community-my-nick">
                  Sən: <strong>{nick}</strong>
                  <button type="button" onClick={() => { setDraftNick(nick); setNick(""); }}>Dəyiş</button>
                </div>
              )}

              <div className="community-stream" role="log" aria-live="polite" aria-relevant="additions">
                {posts.length === 0 ? (
                  <p className="community-muted">{fetching ? "Mesajlar yüklənir…" : feedError ? "Mesajları göstərmək mümkün deyil." : "Hələ mesaj yoxdur. İlk sözü sən de."}</p>
                ) : posts.map((post) => (
                  <article className="community-post" key={post.id}>
                    <div className="community-post-meta">
                      <strong>{post.nickname}</strong>
                      <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleString("az-AZ", { dateStyle: "short", timeStyle: "short" })}</time>
                    </div>
                    <p>{post.body}</p>
                  </article>
                ))}
                <div ref={endRef} />
              </div>

              {feedError && <p className="community-error" role="alert">{feedError}</p>}
              {formError && <p className="community-error" role="alert">{formError}</p>}
              <form className="community-compose" onSubmit={submit}>
                <label className="visually-hidden" htmlFor="community-message">Mesajın</label>
                <textarea id="community-message" placeholder={nick ? "Fikrini yaz…" : "Əvvəlcə ləqəb seç…"} value={text} onChange={(e) => setText(e.target.value)} maxLength={500} rows={2} disabled={!nick || sending} />
                <div>
                  <small>{text.length}/500</small>
                  <button type="submit" disabled={!nick || !text.trim() || sending}>{sending ? "Göndərilir…" : "Paylaş ↗"}</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
