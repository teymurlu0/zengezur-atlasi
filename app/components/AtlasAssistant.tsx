"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  sources?: { label: string; url: string }[];
  mode?: "knowledge" | "ai";
};

const START: Message = {
  id: 0,
  role: "assistant",
  text: "Salam! Zəngəzur Atlasına xoş gəlmisən. Abidələr, bölgənin tarixi və nəqliyyat layihələri haqqında nə bilmək istəyirsən?",
};

const SUGGESTIONS = [
  "Xudafərin körpüsü haqqında danış",
  "2020-ci ildə nə baş verdi?",
  "Məmmədbəyli türbəsinin tarixi",
];

export default function AtlasAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([START]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) focusRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", keydown);
    return () => { window.removeEventListener("keydown", keydown); abortRef.current?.abort(); };
  }, []);

  async function send(value: string) {
    const text = value.trim();
    if (!text || busy) return;
    setInput("");
    setError("");
    const newMessage: Message = { id: nextId.current++, role: "user", text };
    const history = messages.filter(m => m.id !== 0).slice(-6).map(m => ({ role: m.role, content: m.text }));
    setMessages(old => [...old, newMessage]);
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });
      const payload = await response.json() as {
        answer?: string;
        sources?: Message["sources"];
        mode?: Message["mode"];
        error?: string;
      };
      if (!response.ok || !payload.answer) throw new Error(payload.error ?? "Cavab alınmadı.");
      setMessages(old => [...old, {
        id: nextId.current++, role: "assistant", text: payload.answer!,
        sources: payload.sources ?? [], mode: payload.mode,
      }]);
    } catch (cause) {
      if (!controller.signal.aborted) {
        setError(cause instanceof Error ? cause.message : "Bağlantı xətası baş verdi.");
      }
    } finally {
      if (!controller.signal.aborted) setBusy(false);
      abortRef.current = null;
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <aside className="atlas-assistant-root" aria-label="Atlas bələdçisi">
      {open && (
        <section className="atlas-chat-panel" aria-label="Atlas bələdçisi ilə söhbət">
          <div className="atlas-chat-header">
            <div>
              <span className="atlas-chat-kicker">ZƏNGƏZUR ATLASI</span>
              <h2>Atlas bələdçisi</h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="atlas-chat-close" aria-label="Söhbəti bağla">×</button>
          </div>
          <div className="atlas-chat-messages" ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions">
            {messages.map(m => (
              <div key={m.id} className={m.role === "user" ? "atlas-msg atlas-msg-user" : "atlas-msg atlas-msg-assistant"}>
                <span className="atlas-msg-author">{m.role === "user" ? "Sən" : "Bələdçi"}</span>
                <p>{m.text}</p>
                {!!m.sources?.length && (
                  <div className="atlas-msg-sources">
                    {m.sources.map(s => (
                      <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
                    ))}
                  </div>
                )}
                {m.mode === "knowledge" && <small className="atlas-msg-mode">Mənbə bazası</small>}
              </div>
            ))}
            {busy && <div className="atlas-msg atlas-msg-assistant atlas-typing">Məlumat axtarılır<span> · · ·</span></div>}
          </div>
          {messages.length < 3 && (
            <div className="atlas-chat-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} type="button" disabled={busy} onClick={() => void send(s)}>{s} ↗</button>
              ))}
            </div>
          )}
          {!!error && <div role="alert" className="atlas-chat-error">{error} Yenidən yoxla.</div>}
          <form className="atlas-chat-input" onSubmit={onSubmit}>
            <label className="visually-hidden" htmlFor="atlas-question">Sualını yaz</label>
            <textarea id="atlas-question" ref={focusRef} rows={2} maxLength={1200}
              placeholder="Sualını yaz..." value={input} onChange={event => setInput(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  void send(input);
                }
              }} />
            <button type="submit" disabled={!input.trim() || busy} aria-label="Mesajı göndər">↗</button>
          </form>
          <p className="atlas-chat-foot">Məlumatlar mənbələrə əsaslanır. Cavabları ilkin istinadlarla yoxlaya bilərsən.</p>
        </section>
      )}
      <button type="button" className={open ? "atlas-chat-launcher is-open" : "atlas-chat-launcher"}
        onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Bələdçini bağla" : "Atlas bələdçisini aç"}>
        <span className="atlas-launcher-icon">{open ? "×" : "✦"}</span>
        {!open && <span>Atlas bələdçisi</span>}
      </button>
    </aside>
  );
}
