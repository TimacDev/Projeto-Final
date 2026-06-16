import db from '../../../lib/db';

export async function GET() {
  const [rows] = await db.query(
    `SELECT bl.id, bl.brewed_at, bl.method, bl.dose_g, bl.water_temp_c, bl.notes,
            c.coffee_name AS name
     FROM brew_logs bl
     JOIN coffees c ON c.id = bl.coffee_id
     ORDER BY bl.brewed_at DESC, bl.id DESC`
  );
  return Response.json(rows);
}

export async function POST(request) {
  const body = await request.json();

  const { coffee_id, brewed_at, method, dose_g, water_g, grind_setting, water_temp_c, brew_time_sec, notes } = body;

  if (!coffee_id) {
    return Response.json({ error: 'coffee_id is required' }, { status: 400 });
  }

  const PLACEHOLDER_USER_ID = 1; // replaced when login is implemented

  const [result] = await db.query(
    `INSERT INTO brew_logs (user_id, coffee_id, brewed_at, method, dose_g, water_g, grind_setting, water_temp_c, brew_time_sec, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [PLACEHOLDER_USER_ID, coffee_id, brewed_at || null, method || null, dose_g || null, water_g || null, grind_setting || null, water_temp_c || null, brew_time_sec || null, notes || null]
  );

  return Response.json({ id: result.insertId }, { status: 201 });
}
