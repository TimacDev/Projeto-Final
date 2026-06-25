import db from '../../../../lib/db';
import { getCurrentUser } from '../../../../lib/auth';
import { validateBrewLog } from '../../../../lib/formValidation';

export async function PUT(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const errors = validateBrewLog(body);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const { coffee_id, brewed_at, method, dose_g, water_g, grind_setting, water_temp_c, brew_time_sec, notes, rating } = body;

  const [result] = await db.query(
    `UPDATE brew_logs
     SET coffee_id = ?, brewed_at = ?, method = ?, dose_g = ?, water_g = ?,
         grind_setting = ?, water_temp_c = ?, brew_time_sec = ?, notes = ?, rating = ?
     WHERE id = ? AND user_id = ?`,
    [coffee_id, brewed_at || null, method || null, dose_g || null, water_g || null, grind_setting || null, water_temp_c || null, brew_time_sec || null, notes || null, rating || null, id, user.id]
  );

  if (result.affectedRows === 0) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({ id: Number(id) });
}

export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;

  const [result] = await db.query(
    `DELETE FROM brew_logs WHERE id = ? AND user_id = ?`,
    [id, user.id]
  );

  if (result.affectedRows === 0) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({ id: Number(id) });
}
