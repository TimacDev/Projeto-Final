import db from '../../../lib/db';
import { getCurrentUser } from '../../../lib/auth';
import { validateCoffee } from '../../../lib/validators';

export async function GET() {
  const [rows] = await db.query(
    `SELECT c.id, c.coffee_name AS name, c.roaster, c.country, c.roast_level, c.roaster_notes,
            ROUND(AVG(cr.rating), 1) AS rating
     FROM coffees c
     LEFT JOIN coffee_ratings cr ON cr.coffee_id = c.id
     GROUP BY c.id
     ORDER BY c.coffee_name`
  );
  return Response.json(rows);
}

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await request.json();

  const errors = validateCoffee(body);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const { coffee_name, roaster, country, region, producer, variety, coffee_process, roast_level, roast_date, roaster_notes } = body;

  const [result] = await db.query(
    `INSERT INTO coffees (user_id, coffee_name, roaster, country, region, producer, variety, coffee_process, roast_level, roast_date, roaster_notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user.id, coffee_name, roaster, country, region, producer, variety, coffee_process || null, roast_level || null, roast_date || null, roaster_notes]
  );

  return Response.json({ id: result.insertId, name: coffee_name, roaster, country, roast_level, roaster_notes, rating: null }, { status: 201 });
}
