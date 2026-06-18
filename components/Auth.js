'use client';

import { useState } from 'react';

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isSignup = mode === 'signup';

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const body = isSignup ? { name, email, password } : { email, password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      onAuthed(data.user);
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode(isSignup ? 'login' : 'signup');
    setError('');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
      <form className="sk-box" onSubmit={submit} style={{ padding: 28, width: '100%', maxWidth: 380 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 26,
            marginBottom: 4,
            letterSpacing: '-0.01em',
          }}
        >
          {isSignup ? 'Create your account' : 'Welcome back'}
        </div>
        <p className="page-sub" style={{ marginBottom: 22 }}>
          {isSignup ? 'Sign up to start your coffee journal.' : 'Log in to your coffee journal.'}
        </p>

        {isSignup && (
          <div style={{ marginBottom: 14 }}>
            <div className="log-field-label">Name</div>
            <input
              className="log-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <div className="log-field-label">Email</div>
          <input
            className="log-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div className="log-field-label">Password</div>
          <input
            className="log-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignup ? 'At least 8 characters' : '••••••••'}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />
        </div>

        {error && <div style={{ color: '#b3402e', fontSize: 14, marginBottom: 14 }}>{error}</div>}

        <button className="btn primary" type="submit" disabled={busy} style={{ width: '100%' }}>
          {busy ? 'Please wait…' : isSignup ? 'Create account ✓' : 'Log in →'}
        </button>

        <div style={{ marginTop: 18, fontSize: 14, color: '#7a6245', textAlign: 'center' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={switchMode}
            style={{
              background: 'none',
              border: 'none',
              color: '#1a1208',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
              fontSize: 14,
            }}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
