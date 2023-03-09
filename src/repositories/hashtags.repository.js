import db from '../database/database.connection.js';

export async function getAllHashtags() {
  const result = await db.query('SELECT * FROM hashtags ORDER BY "timesUsed" DESC LIMIT 10');
  return result.rows;
}

export async function insertHashtags(hashtag) {
  
    await db.query('INSERT INTO hashtags (name, "timesUsed") VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET "timesUsed" = hashtags."timesUsed" + 1', [hashtag.h, 1]);

}

