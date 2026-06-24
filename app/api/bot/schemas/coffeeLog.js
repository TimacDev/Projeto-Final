import { z } from 'zod';

const PROCESS_OPTIONS = ['washed', 'natural', 'honey', 'wet-hulled', 'anaerobic'];
const ROAST_LEVELS = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];

export const coffeeLogSchema = z.object({
  coffee_name:    z.string().max(200).describe('Name of the coffee'),
  roaster:        z.string().max(200).describe('Name of the roastery'),
  country:        z.string().max(200).describe('Country of origin'),
  region:         z.string().max(200).describe('Region or area within the country'),
  producer:       z.string().max(200).describe('Farm or cooperative that produced the coffee'),
  variety:        z.string().max(200).describe('Coffee variety or cultivar, e.g. Yellow Bourbon, Gesha'),
  coffee_process: z.enum(PROCESS_OPTIONS).describe(`Processing method. Options: ${PROCESS_OPTIONS.join(', ')}`),
  roast_level:    z.enum(ROAST_LEVELS).describe(`Roast level. Options: ${ROAST_LEVELS.join(', ')}`),
  roast_date:     z.coerce.date().optional().describe('Date the coffee was roasted (ISO date string)'),
  roaster_notes:  z.string().max(200).describe('Tasting notes provided by the roaster, e.g. sweet, fruity, nutty'),
});
