import db from '../../../../lib/db';

function parseEnumOrSet(columnType) {
  const matches = columnType.match(/'([^']+)'/g);
  return matches ? matches.map(m => m.replace(/'/g, '')) : [];
}

export async function GET() {
  const [rows] = await db.query(
    `SELECT COLUMN_NAME, COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brew_logs' AND COLUMN_NAME IN ('method', 'notes')`
  );

  const options = {};
  for (const row of rows) {
    options[row.COLUMN_NAME] = parseEnumOrSet(row.COLUMN_TYPE);
  }

  return Response.json(options);
}
