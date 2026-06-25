import { useEffect } from "react";

export default function ErrorMessage({ messages, onDismiss }) {
  useEffect(() => {
    if (messages.length === 0) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="toast">
      {messages.map((msg, i) => (
        <div key={i} className="toast-message">{msg}</div>
      ))}
    </div>
  );
}
