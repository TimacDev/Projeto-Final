import db from './db';

export async function getCoffeeCatalog() {
  const [rows] = await db.query(
    `SELECT c.id, c.coffee_name AS name, c.roaster, c.country, c.roast_level, c.roaster_notes,
            ROUND(AVG(cr.rating), 1) AS rating
     FROM coffees c
     LEFT JOIN coffee_ratings cr ON cr.coffee_id = c.id
     GROUP BY c.id
     ORDER BY c.coffee_name`
  );
  return rows;
}
