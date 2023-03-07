import db from '../database/database.connection.js';

export async function getAllHashtags() {
  const result = await db.query('SELECT * FROM hashtags ORDER BY "timesUsed" DESC LIMIT 10');
  return result.rows;
}
