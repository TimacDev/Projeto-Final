const BREW_METHODS = ['Pour-Over', 'Espresso', 'French-Press', 'AeroPress', 'ColdBrew', 'Other'];
const TASTING_NOTES = ['roasted', 'spices', 'nutty/cocoa', 'sweet', 'floral', 'fruity', 'green/vegetative', 'sour/fermented', 'other'];
const PROCESS_OPTIONS = ['washed', 'natural', 'honey', 'wet-hulled', 'anaerobic'];
const ROAST_LEVELS = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];

export function validateBrewLog(body) {
  const errors = [];
  const { coffee_id, brewed_at, method, dose_g, water_g, grind_set ,water_temp_c, brew_time_sec, notes, rating } = body;

  if (!coffee_id) errors.push('Select a coffee name');

  if (brewed_at && isNaN(Date.parse(brewed_at))) errors.push('Invalid date');

  //add grind_set

  if (method && !BREW_METHODS.includes(method)) errors.push(`You need to select one method`);

  if (dose_g !== undefined && dose_g !== null && dose_g !== '') {
    const d = Number(dose_g);
    if (!Number.isInteger(d) || d < 1 || d > 1000) errors.push('Coffee dosage must be an integer between 1 and 1000');
  }

  if (water_g !== undefined && water_g !== null && water_g !== '') {
    const w = Number(water_g);
    if (!Number.isInteger(w) || w < 1 || w > 10000) errors.push('Water dosage must be an integer between 1 and 10000');
  }

  if (water_temp_c !== undefined && water_temp_c !== null && water_temp_c !== '') {
    const w = Number(water_temp_c);
    if (!Number.isInteger(w) || w < 1 || w > 120) errors.push('Water temp must be an integer between 1 and 120');
  }

  if (brew_time_sec !== undefined && brew_time_sec !== null && brew_time_sec !== '') {
    const b = Number(brew_time_sec);
    if (!Number.isInteger(b) || b < 1 || b > 3600) errors.push('Brew time must be an integer between 1 and 3600');
  }

  if (notes) {
    const noteList = notes.split(',').map(n => n.trim()).filter(Boolean);
    const invalid = noteList.filter(n => !TASTING_NOTES.includes(n));
    if (invalid.length) errors.push(`invalid tasting notes: ${invalid.join(', ')}`);
  }

  if (rating !== undefined && rating !== null && rating !== '') {
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 10) errors.push('Rating must be an integer between 1 and 10');
  }

  return errors;
}

export function validateCoffee(body) {
  const errors = [];
  const { coffee_name, roaster, country, region, producer, variety, coffee_process, roast_level, roast_date, roaster_notes } = body;

  if (!coffee_name?.trim() || coffee_name.trim().length < 3) errors.push('Coffee name is required');
  if (!roaster?.trim() || roaster.trim().length < 3) errors.push('Roaster is required');
  if (!country?.trim() || country.trim().length < 3) errors.push('Country is required');
  if (!region?.trim() || region.trim().length < 3) errors.push('Region is required');
  if (!ROAST_LEVELS.includes(roast_level)) errors.push('Select a roast level');
  if (!PROCESS_OPTIONS.includes(coffee_process)) errors.push('Select a process');
  if (!producer?.trim() || producer.trim().length < 3) errors.push('Producer is required');
  if (!variety?.trim() || variety.trim().length < 3) errors.push('Variety is required');
  if (!roaster_notes?.trim() || roaster_notes.trim().length < 3) errors.push('Roaster notes is required');
  if (!roast_date || isNaN(Date.parse(roast_date))) errors.push('Roast date must be a valid date');
  console.log('coffee_process =', coffee_process, '| roast_level =', roast_level, '| roast_date =', roast_date)

  return errors;
}

export function validateRating(body) {
  const errors = [];
  const r = Number(body.rating);
  if (!Number.isInteger(r) || r < 1 || r > 10) errors.push('Rating must be an integer between 1 and 10');
  return errors;
}

export function validateComment(body) {
  const errors = [];
  const comment = typeof body.comment === 'string' ? body.comment.trim() : '';
  if (!comment) errors.push('Comment cannot be empty');
  if (comment.length > 1000) errors.push('Comment must be 1000 characters or fewer');
  return errors;
}
