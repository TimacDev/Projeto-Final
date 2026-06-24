import db from '../../../lib/db';

export async function GET() {
  const [rows] = await db.query('SELECT id, coffee_name AS name, roaster, country, roast_level, roaster_notes, rating FROM coffees ORDER BY coffee_name');
  return Response.json(rows);
}
