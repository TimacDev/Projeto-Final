import db from '../../../../../lib/db';
import { getCurrentUser } from '../../../../../lib/auth';
import { validateRating } from '../../../../../lib/formValidation';

export async function PUT(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const errors = validateRating(body);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const rating = Number(body.rating);

  await db.query(
    `INSERT INTO coffee_ratings (coffee_id, user_id, rating)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
    [id, user.id, rating]
  );

  const [[stats]] = await db.query(
    `SELECT ROUND(AVG(rating), 1) AS rating_avg, COUNT(*) AS rating_count
     FROM coffee_ratings WHERE coffee_id = ?`,
    [id]
  );

  return Response.json({
    rating_avg: stats.rating_avg,
    rating_count: stats.rating_count,
    your_rating: rating,
  });
}
