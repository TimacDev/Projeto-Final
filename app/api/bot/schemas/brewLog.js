import { z } from 'zod';

export const brewLogSchema = z.object({
  brewed_at: z.coerce.date().optional().describe('When the brew was made (ISO date string)'),
  method: z.string().optional().describe('Brew method, e.g. "V60", "French Press", "Espresso"'),
  dose_g: z.number().positive().min(0).max(1000).optional().describe('Grams of coffee used'),
  water_g: z.number().positive().min(0).max(5000).optional().describe('Grams of water used'),
  grind_setting: z.string().optional().describe('Grinder setting or coarseness description'),
  water_temp_c: z.number().int().min(-5).max(120).optional().describe('Water temperature in Celsius'),
  brew_time_sec: z.number().int().min(0).max(3600).optional().describe('Total brew time in seconds'),
  notes: z.string().optional().describe('Free-form tasting notes'),
});