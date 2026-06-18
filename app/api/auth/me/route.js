import db from '../../../../lib/db';
import { getCurrentUser } from '../../../../lib/auth';

export async function GET() {
  const session = await getCurrentUser();
  if (!session) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  // Re-read the profile from the DB so the name stays fresh even if it changed
  // since the session token was issued.
  const [rows] = await db.query(
    'SELECT id, user_name AS name, email FROM users WHERE id = ?',
    [session.id]
  );
  if (rows.length === 0) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  return Response.json({ user: rows[0] });
}
