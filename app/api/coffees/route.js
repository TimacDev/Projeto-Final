import db from '../../../lib/db';
import { getCurrentUser } from '../../../lib/auth';
import { validateCoffee } from '../../../lib/formValidation';
import { getCoffeeCatalog } from '../../../lib/coffees';

export async function GET() {
  return Response.json(await getCoffeeCatalog());
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

  return Response.json({ id: result.insertId, user_id: user.id, name: coffee_name, roaster, country, roast_level, roaster_notes, rating: null }, { status: 201 });
}
