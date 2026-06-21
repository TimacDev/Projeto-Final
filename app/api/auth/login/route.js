import { cookies } from 'next/headers';
import db from '../../../../lib/db';
import { verifyPassword, signSession, SESSION_COOKIE, cookieOptions } from '../../../../lib/auth';

const EMAIL_RE = /^[\w\-.+]{3,}@([\w-]+\.){1,15}[\w-]{2,4}$/;

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: 'Email and password are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const [rows] = await db.query(
    'SELECT id, user_name, email, user_password FROM users WHERE email = ?',
    [email]
  );
  const account = rows[0];

  const invalid = () => Response.json({ error: 'Invalid email or password.' }, { status: 401 });

  if (!account) return invalid();

  const ok = await verifyPassword(password, account.user_password);
  if (!ok) return invalid();

  const user = { id: account.id, name: account.user_name, email: account.email };
  const token = await signSession({ id: user.id, email: user.email });
  (await cookies()).set(SESSION_COOKIE, token, cookieOptions);

  return Response.json({ user });
}
