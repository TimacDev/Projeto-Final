import db from '../../../../../../lib/db';
import { getCurrentUser } from '../../../../../../lib/auth';

export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { commentId } = await params;

  const [result] = await db.query(
    `DELETE FROM comments WHERE id = ? AND user_id = ?`,
    [commentId, user.id]
  );

  if (result.affectedRows === 0) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({ id: Number(commentId) });
}
