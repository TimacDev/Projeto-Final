import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Name of the cookie that carries the signed session token.
export const SESSION_COOKIE = 'session';

// How long a session stays valid, in seconds (7 days).
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// Attributes shared by the routes that set/clear the session cookie.
// httpOnly keeps it out of reach of JavaScript (defends against XSS token theft);
// Secure is only enforced in production so http://localhost still works in dev.
export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE,
};

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set — add it to your .env file.');
  return new TextEncoder().encode(secret);
}

// --- Passwords ---------------------------------------------------------------

export function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

// --- Session token -----------------------------------------------------------

export async function signSession({ id, email }) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { id: Number(payload.sub), email: payload.email };
  } catch {
    return null;
  }
}

// Reads the session cookie, verifies it, and returns { id, email } or null.
// This is the single helper every protected route calls to identify the caller.
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}
