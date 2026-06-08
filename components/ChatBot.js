'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! Ask me about origins, brew methods, water, or grinders.' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message whenever the list grows or the panel opens.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending, open]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const { reply } = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Try again.' }]);
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button className="chatbot-bubble" onClick={() => setOpen(true)} aria-label="Open chat">
        ☕
      </button>
    );
  }

  return (
    <div className="chatbot-panel" role="dialog" aria-label="Coffee assistant chat">
      <header className="chatbot-header">
        <div className="chatbot-title">Ask Grounds</div>
        <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
      </header>

      <div className="chatbot-messages" ref={scrollRef}>
        {messages.map((m, i) =>
          <div key={i} className={`chatbot-msg chatbot-msg-${m.role}`}>{m.text}</div>
        )}
        {sending && (
          <div className="chatbot-msg chatbot-msg-bot chatbot-msg-typing" aria-label="Assistant is typing">
            <span></span><span></span><span></span>
          </div>
        )}
      </div>

      <form className="chatbot-input-row" onSubmit={send}>
        <input
          className="chatbot-input"
          type="text"
          placeholder="Ask about coffee…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={sending}
          autoFocus
        />
        <button className="chatbot-send" type="submit" disabled={!input.trim() || sending} aria-label="Send">
          →
        </button>
      </form>
    </div>
  );
}
