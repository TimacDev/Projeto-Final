"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatBot({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me about origins, brew methods, water, or grinders.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message whenever the list grows or the panel opens.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending, open]);

  // Teaser speech bubble: once the widget becomes visible (user past the landing),
  // pop it in after ~2.5s, then auto-hide ~6s later. Runs only once. We toggle a
  // class (rather than unmount) so CSS can animate it in and out.
  const teasedRef = useRef(false);
  useEffect(() => {
    if (!visible || teasedRef.current) return;
    teasedRef.current = true;
    const showTimer = setTimeout(() => setShowTeaser(true), 2500);
    const hideTimer = setTimeout(() => setShowTeaser(false), 8500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't reach Mr. Beanie right now. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  // When `visible` is false, we keep the component mounted (state preserved)
  // but make it invisible AND non-interactive:
  //  - `chatbot-hidden` class → opacity:0 + pointer-events:none (so mouse can't click it)
  //  - tabIndex={-1}          → keyboard tabbing skips it
  //  - aria-hidden={true}     → screen readers ignore it
  const hiddenClass = visible ? "" : " chatbot-hidden";
  const tabIndex = visible ? 0 : -1;

  if (!open) {
    return (
      <>
        <div
          className={`chatbot-teaser${showTeaser ? "" : " chatbot-teaser-off"}${hiddenClass}`}
          onClick={() => setOpen(true)}
          aria-hidden="true"
        >
          {"Hi, I'm Mr. Beanie!"}
        </div>
        <button
          className={`chatbot-bubble${hiddenClass}`}
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          aria-hidden={!visible}
          tabIndex={tabIndex}
        >
          <img
            src="/MrBeanie.svg"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
        </button>
      </>
    );
  }

  return (
    <div
      className={`chatbot-panel${hiddenClass}`}
      role="dialog"
      aria-label="Coffee assistant chat"
      aria-hidden={!visible}
    >
      <header className="chatbot-header">
        <div className="chatbot-title">Ask Mr. Beanie</div>
        <button
          className="chatbot-close"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
        >
          ✕
        </button>
      </header>

      <div className="chatbot-messages" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chatbot-msg chatbot-msg-${m.role}`}>
            {m.text}
          </div>
        ))}
        {sending && (
          <div
            className="chatbot-msg chatbot-msg-bot chatbot-msg-typing"
            aria-label="Assistant is typing"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <form className="chatbot-input-row" onSubmit={send}>
        <input
          className="chatbot-input"
          type="text"
          placeholder="Ask about coffee…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          autoFocus
        />
        <button
          className="chatbot-send"
          type="submit"
          disabled={!input.trim() || sending}
          aria-label="Send"
        >
          →
        </button>
      </form>
    </div>
  );
}
