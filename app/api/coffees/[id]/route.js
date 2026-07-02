import db from '../../../../lib/db';
import { getCurrentUser } from '../../../../lib/auth';

export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;

  const [[coffee]] = await db.query(
    `SELECT id, coffee_name AS name, roaster, country, region, producer, variety,
            coffee_process, roast_level, roast_date, roaster_notes
     FROM coffees WHERE id = ?`,
    [id]
  );
  if (!coffee) return Response.json({ error: 'Not found' }, { status: 404 });

  const [[stats]] = await db.query(
    `SELECT ROUND(AVG(rating), 1) AS rating_avg, COUNT(*) AS rating_count
     FROM coffee_ratings WHERE coffee_id = ?`,
    [id]
  );

  const [[mine]] = await db.query(
    `SELECT rating FROM coffee_ratings WHERE coffee_id = ? AND user_id = ?`,
    [id, user.id]
  );

  const [comments] = await db.query(
    `SELECT cm.id, cm.comment, cm.created_at, u.user_name AS author,
            (cm.user_id = ?) AS is_mine
     FROM comments cm
     JOIN users u ON u.id = cm.user_id
     WHERE cm.coffee_id = ?
     ORDER BY cm.created_at DESC`,
    [user.id, id]
  );

  return Response.json({
    ...coffee,
    rating_avg: stats.rating_avg,
    rating_count: stats.rating_count,
    your_rating: mine?.rating ?? null,
    comments: comments.map((c) => ({ ...c, is_mine: !!c.is_mine })),
  });
}

// Scoped to the owner in the query itself (rather than a separate ownership
// check) so it 404s the same way whether the coffee doesn't exist or just
// isn't this user's — same pattern as DELETE /api/brew-logs/[id]. Deleting a
// coffee cascades (via FK ON DELETE CASCADE) to its ratings, comments, and
// any brew logs — including other users' — that reference it.
export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;

  const [result] = await db.query(
    `DELETE FROM coffees WHERE id = ? AND user_id = ?`,
    [id, user.id]
  );

  if (result.affectedRows === 0) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({ id: Number(id) });
}
