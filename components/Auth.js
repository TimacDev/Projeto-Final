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
    <div className="auth-wrap">
      <form className="sk-box auth-card" onSubmit={submit}>
        <div className="auth-title">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </div>
        <p className="page-sub auth-sub">
          {isSignup ? 'Sign up to start your coffee journal.' : 'Log in to your coffee journal.'}
        </p>

        {isSignup && (
          <div className="auth-field">
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

        <div className="auth-field">
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

        <div className="auth-field">
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

        {error && <div className="auth-error">{error}</div>}

        <button className="btn primary btn-block" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : isSignup ? 'Create account ✓' : 'Log in →'}
        </button>

        <div className="auth-switch">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={switchMode} className="auth-switch-btn">
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
