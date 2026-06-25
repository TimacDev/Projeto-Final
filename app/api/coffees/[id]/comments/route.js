import db from '../../../../../lib/db';
import { getCurrentUser } from '../../../../../lib/auth';
import { validateComment } from '../../../../../lib/formValidation';

export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const errors = validateComment(body);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const comment = body.comment.trim();

  const [result] = await db.query(
    `INSERT INTO comments (user_id, coffee_id, comment) VALUES (?, ?, ?)`,
    [user.id, id, comment]
  );

  const [[row]] = await db.query(
    `SELECT cm.id, cm.comment, cm.created_at, u.user_name AS author
     FROM comments cm JOIN users u ON u.id = cm.user_id
     WHERE cm.id = ?`,
    [result.insertId]
  );

  return Response.json({ ...row, is_mine: true }, { status: 201 });
}
