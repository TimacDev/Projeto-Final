import { cookies } from 'next/headers';
import db from '../../../../lib/db';
import { hashPassword, signSession, SESSION_COOKIE, cookieOptions } from '../../../../lib/auth';

const EMAIL_RE = /^[\w\-.+]{3,}@([\w-]+\.){1,15}[\w-]{2,4}$/;

export async function POST(request) {
  const { name, email, password } = await request.json();
  const email_lowerCase = email?.toLowerCase().trim();

  if (!name || !email_lowerCase || !password) {
    return Response.json({ error: 'Name, email and password are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email_lowerCase)){
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (password.length <= 8) {
    return Response.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
  }

  const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email_lowerCase]);
  if (existing.length > 0) {
    return Response.json({ error: 'An account with this email already exists.' }, { status: 409 });
  }

  const hash = await hashPassword(password);
  const [result] = await db.query(
    'INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?)',
    [name, email_lowerCase, hash]
  );

  const user = { id: result.insertId, name, email: email_lowerCase };
  const token = await signSession({ id: user.id, email });
  (await cookies()).set(SESSION_COOKIE, token, cookieOptions);

  return Response.json({ user }, { status: 201 });
}
