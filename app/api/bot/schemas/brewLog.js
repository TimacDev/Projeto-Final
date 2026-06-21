import { z } from 'zod';
import db from '../../../../lib/db';

function parseEnumOrSet(columnType) {
  return columnType.match(/'([^']+)'/g).map(v => v.replace(/'/g, ''));
}
//The function uses a regex /'([^']+)'/g to find every 'value' token in that string, then strips the surrounding
//quotes — returning a plain JS array like ['Pour-Over', 'Espresso', 'French-Press'].
//That array is then passed to z.enum(...) to build the Zod validator dynamically.

export async function buildBrewLogSchema(userId) {
  const [[methodCol], [notesCol], [coffeeRows]] = await Promise.all([
    db.query(
      `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_NAME = 'brew_logs' AND COLUMN_NAME = 'method'`
    ),
    db.query(
      `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_NAME = 'brew_logs' AND COLUMN_NAME = 'notes'`
    ),
    db.query('SELECT coffee_name FROM coffees WHERE user_id = ?', [userId]),
  ]);

  const methods = parseEnumOrSet(methodCol[0].COLUMN_TYPE);
  const tastingNotes = parseEnumOrSet(notesCol[0].COLUMN_TYPE);
  const coffeeNames = coffeeRows.map(r => r.coffee_name);

  return z.object({
    coffee_name: z.enum(coffeeNames).describe(`Name of the coffee being brewed. Available: ${coffeeNames.join(', ')}`),
    brewed_at: z.coerce.date().optional().describe('When the brew was made (ISO date string)'),
    method: z.enum(methods).default('Other').describe(`Brew method. Options: ${methods.join(', ')}`),
    dose_g: z.number().int().min(0).max(32767).optional().describe('Grams of coffee used'),
    water_g: z.number().int().min(0).max(32767).optional().describe('Grams of water used'),
    grind_setting: z.string().max(200).optional().describe('Grinder setting or coarseness description'),
    water_temp_c: z.number().int().min(-5).max(120).optional().describe('Water temperature in Celsius'),
    brew_time_sec: z.number().int().min(0).max(3600).optional().describe('Total brew time in seconds'),
    notes: z.array(z.enum(tastingNotes)).default(['other']).describe(`Tasting notes. Options: ${tastingNotes.join(', ')}`),
  });
}