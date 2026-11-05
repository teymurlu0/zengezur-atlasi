"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Post = { id: string; author_id: string; nickname: string; body: string; created_at: string };
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const enabled = Boolean(URL && KEY);
// Tək brauzer klienti: mütəmadi sorğularda yeni əlaqələr yaradılmır.
const db: SupabaseClient | null = enabled ? createClient(URL!, KEY!, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
}) : null;

export default function CommunityChat() {
  const [nick, setNick] = useState("");
  const [draftNick, setDraftNick] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const myId = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const reload = useCallback(async () => {
    if (!db) return;
    const { data, error } = await db.from("community_posts").select("id,author_id,nickname,body,created_at").order("created_at", { ascending: false }).limit(60);
    if (error) { setStatus("Mesajlar yüklənmədi. Verilənlər bazasının quruluşunu yoxlayın."); return; }
    setPosts((data ?? []).reverse() as Post[]);
  }, []);

  useEffect(() => {
    if (!db) { setLoading(false); return; }
    const client = db;
    let active = true;
    async function init() {
      const { data: current } = await client.auth.getUser();
      if (!active) return;
      let user = current.user;
      if (!user) {
        const result = await client.auth.signInAnonymously();
        if (result.error) { setStatus("Ləqəblə giriş mümkün olmadı. Supabase-də Anonymous Sign-Ins aktiv olmalıdır."); setLoading(false); return; }
        user = result.data.user;
      }
      myId.current = user?.id ?? null;
      try { const stored = localStorage.getItem("zengezurium-nick") ?? ""; if (active) { setNick(stored); setDraftNick(stored); } } catch {}
      await reload();
      if (active) setLoading(false);
    }
    void init();
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") void reload(); }, 12000);
    return () => { active = false; window.clearInterval(timer); };
  }, [reload]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [posts.length]);

  function saveNick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clean = draftNick.trim().replace(/\s+/g, " ");
    if (!/^[\p{L}\p{N}_ .-]{2,24}$/u.test(clean)) { setStatus("Ləqəb 2–24 simvol olmalıdır; hərf, rəqəm, boşluq, nöqtə, _ və - istifadə et."); return; }
    setNick(clean); setStatus("");
    try { localStorage.setItem("zengezurium-nick", clean); } catch {}
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = text.trim();
    if (!db || !nick || !myId.current || !body || sending) return;
    if (body.length > 500) { setStatus("Mesaj 500 simvoldan uzun olmamalıdır."); return; }
    setSending(true); setStatus("");
    const { error } = await db.from("community_posts").insert({ author_id: myId.current, nickname: nick, body });
    if (error) setStatus(error.message.includes("rate_limit") ? "Mesajlar arasında ən azı 10 saniyə gözlə." : "Mesaj göndərilmədi. Bir qədər sonra yenidən cəhd et.");
    else { setText(""); await reload(); }
    setSending(false);
  }

  return (
    <section className="community-section" id="community" aria-labelledby="community-title">
      <div className="section-intro"><div><span className="kicker">SÖHBƏT MEYDANI</span><h2 id="community-title">Söz sənindir.</h2></div><p>Gördüklərini, bildiklərini və suallarını öz seçdiyin ləqəblə paylaş.</p></div>
      <div className="community-shell">
        <aside className="community-info"><span className="community-mark">✳</span><h3>Eyni yerə fərqli baxışlar.</h3><p>Bura Zəngəzur haqqında məlumat, xatirə və sualların paylaşıldığı açıq söhbət yeridir.</p><div className="community-rule"><strong>Sadə qaydalar</strong><p>Hörmətli danış, şəxsi məlumat paylaşma, nifrət və təhqirdən uzaq ol. Ləqəb hesab təsdiqi deyil.</p></div><small>Mesajlar ictimai görünür. Anonim giriş üçün serverdə Supabase qurulmalıdır.</small></aside>
        <div className="community-board">
          {!enabled ? <div className="community-empty"><strong>Söhbət bölməsi hazırdır</strong><p>Hamının bir-birinin mesajlarını görməsi üçün Supabase bağlantısı qurulmalıdır. <code>.env.local</code> və SQL quraşdırmasını README faylında göstərmişəm.</p></div> : <>
            <div className="community-board-top"><div><strong>İcma söhbəti</strong><span>Son 60 mesaj · 12 saniyədən bir yenilənir</span></div><button type="button" onClick={() => void reload()}>Yenilə ↻</button></div>
            {!nick && <form className="community-nick-form" onSubmit={saveNick}><label htmlFor="community-nickname">Söhbətdə hansı adla görünmək istəyirsən?</label><div><input id="community-nickname" value={draftNick} onChange={e => setDraftNick(e.target.value)} maxLength={24} placeholder="Ləqəbin" required /><button type="submit">Daxil ol</button></div></form>}
            {nick && <div className="community-my-nick">Sən: <strong>{nick}</strong><button type="button" onClick={() => { setDraftNick(nick); setNick(""); }}>Dəyiş</button></div>}
            <div className="community-stream" role="log" aria-live="polite" aria-relevant="additions">{loading ? <p className="community-muted">Mesajlar yüklənir…</p> : posts.length === 0 ? <p className="community-muted">Hələ mesaj yoxdur. İlk sözü sən de.</p> : posts.map(p => <article className="community-post" key={p.id}><div className="community-post-meta"><strong>{p.nickname}</strong><time dateTime={p.created_at}>{new Date(p.created_at).toLocaleString("az-AZ", { dateStyle: "short", timeStyle: "short" })}</time></div><p>{p.body}</p></article>)}<div ref={bottomRef} /></div>
            {status && <p className="community-error" role="alert">{status}</p>}
            <form className="community-compose" onSubmit={submit}><label className="visually-hidden" htmlFor="community-message">Mesajın</label><textarea id="community-message" placeholder={nick ? "Fikrini yaz…" : "Əvvəlcə ləqəb seç…"} value={text} onChange={e => setText(e.target.value)} maxLength={500} rows={2} disabled={!nick || sending || loading} /><div><small>{text.length}/500</small><button type="submit" disabled={!nick || !text.trim() || sending || loading}>{sending ? "Göndərilir…" : "Paylaş ↗"}</button></div></form>
          </>}
        </div>
      </div>
    </section>
  );
}
