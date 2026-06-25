import db from '../../../lib/db';
import { getCurrentUser } from '../../../lib/auth';
import { validateBrewLog } from '../../../lib/formValidation';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const [rows] = await db.query(
    `SELECT bl.id, bl.coffee_id, bl.brewed_at, bl.method, bl.dose_g, bl.water_g,
            bl.grind_setting, bl.water_temp_c, bl.brew_time_sec, bl.notes, bl.rating,
            c.coffee_name AS name
     FROM brew_logs bl
     JOIN coffees c ON c.id = bl.coffee_id
     WHERE bl.user_id = ?
     ORDER BY bl.brewed_at DESC, bl.id DESC`,
    [user.id]
  );
  return Response.json(rows);
}

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await request.json();

  const errors = validateBrewLog(body);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const { coffee_id, brewed_at, method, dose_g, water_g, grind_setting, water_temp_c, brew_time_sec, notes, rating } = body;

  const [result] = await db.query(
    `INSERT INTO brew_logs (user_id, coffee_id, brewed_at, method, dose_g, water_g, grind_setting, water_temp_c, brew_time_sec, notes, rating)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user.id, coffee_id, brewed_at || null, method || null, dose_g || null, water_g || null, grind_setting || null, water_temp_c || null, brew_time_sec || null, notes || null, rating || null]
  );

  return Response.json({ id: result.insertId }, { status: 201 });
}
