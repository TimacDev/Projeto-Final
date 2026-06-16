import db from '../../../lib/db';

export async function GET() {
  const [rows] = await db.query('SELECT id, coffee_name AS name FROM coffees ORDER BY coffee_name');
  return Response.json(rows);
}
