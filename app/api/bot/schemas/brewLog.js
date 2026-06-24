import { z } from 'zod';
import db from '../../../../lib/db';

const METHODS = ['Pour-Over', 'Espresso', 'French-Press', 'AeroPress', 'ColdBrew', 'Other'];
const TASTING_NOTES = ['roasted', 'spices', 'nutty/cocoa', 'sweet', 'floral', 'fruity', 'green/vegetative', 'sour/fermented', 'other'];

export async function buildBrewLogSchema(userId) {
  const [coffeeRows] = await db.query('SELECT coffee_name FROM coffees WHERE user_id = ?', [userId]);
  const coffeeNames = coffeeRows.map(r => r.coffee_name);

  return z.object({
    coffee_name: z.enum(coffeeNames).describe(`Name of the coffee being brewed. Available: ${coffeeNames.join(', ')}`),
    brewed_at: z.coerce.date().optional().describe('When the brew was made (ISO date string)'),
    method: z.enum(METHODS).default('Other').describe(`Brew method. Options: ${METHODS.join(', ')}`),
    dose_g: z.number().int().min(0).max(32767).optional().describe('Grams of coffee used'),
    water_g: z.number().int().min(0).max(32767).optional().describe('Grams of water used'),
    grind_setting: z.string().max(200).optional().describe('Grinder setting or coarseness description'),
    water_temp_c: z.number().int().min(-5).max(120).optional().describe('Water temperature in Celsius'),
    brew_time_sec: z.number().int().min(0).max(3600).optional().describe('Total brew time in seconds'),
    notes: z.array(z.enum(TASTING_NOTES)).default(['other']).describe(`Tasting notes. Options: ${TASTING_NOTES.join(', ')}`),
    rating: z.number().int().min(1).max(10).optional().describe('Rating for this brew from 1 to 10'),
  });
}