import connection from "../database/database.connection.js";

export async function getMetadata(url) {
    return await connection.query(`SELECT * FROM metadata WHERE url=$1`, [url]);
  }

export async function insertMetadata(title, description, url, image) {
    return  await connection.query(
        `INSERT INTO metadata (title, description, url, image) VALUES ($1,$2,$3,$4);`,
        [title, description, url, image]
    );
}

export async function insertPost(url, userId, description, metadataId){
    return await connection.query(
        `INSERT INTO posts (url, "userId", description, "metadataId") VALUES ($1,$2,$3,$4) RETURNING id;`,
        [url, userId, description, metadataId]
      );
}

export async function getAllPosts(){
  
    return await connection.query(
        `
        SELECT 
        p.id AS post_id, 
        p.description AS post_description, 
        u.id AS user_id, 
        u.name AS user_name, 
        u."imageUrl" AS user_image_url, 
        COUNT(l.id) AS like_count, 
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'user_id', l."userId", 
              'user_name', u2.name
            )
          ) FILTER (WHERE l.id IS NOT NULL),
          '[]'
        ) AS liked_by_users,
        (SELECT 
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
      GROUP BY 
        p.id, 
        u.id;
        `
    )
}
 
