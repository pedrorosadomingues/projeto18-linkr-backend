import db from '../database/database.connection.js';

export async function getAllHashtags() {
  const result = await db.query('SELECT * FROM hashtags ORDER BY "timesUsed" DESC LIMIT 10');
  return result.rows;
}

export async function insertHashtags(hashtag) {
  
    await db.query('INSERT INTO hashtags (name, "timesUsed") VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET "timesUsed" = hashtags."timesUsed" + 1', [hashtag.h, 1]);

}

xport async function filterPostsByHashtag(hashtag) {
  const result = await db.query(
    `SELECT 
  p.id AS post_id, 
  p.description AS post_description, 
  u.id AS user_id, 
  u.name AS user_name, 
  u."imageUrl" AS user_image_url, 
  CAST(COUNT(l.id) AS INTEGER) AS like_count, 
  COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'user_id', l."userId", 
        'user_name', u2.name
      )
    ) FILTER (WHERE l.id IS NOT NULL),
    '[]'
  ) AS liked_by_users,
  (
    SELECT 
      JSON_BUILD_OBJECT(
        'id', m.id,
        'title', m.title,
        'description', m.description,
        'url', m.url,
        'image', m.image
      )
      FROM metadata m
      WHERE m.id = p."metadataId"
  ) AS metadata_info
FROM 
  posts p 
  JOIN users u ON p."userId" = u.id 
  LEFT JOIN likes l ON l."postId" = p.id 
  LEFT JOIN users u2 ON l."userId" = u2.id 
WHERE 
  p.description ILIKE $1
GROUP BY 
  p.id, 
  u.id
ORDER BY 
  p.created_at DESC 
LIMIT 
  20;`, [`%${hashtag}%`]);
  return result.rows;
}