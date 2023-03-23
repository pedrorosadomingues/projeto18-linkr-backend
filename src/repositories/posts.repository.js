import connection from "../database/database.connection.js";

export async function getMetadata(url) {
  return await connection.query(`SELECT * FROM metadata WHERE url=$1`, [url]);
}

export async function insertMetadata(title, description, url, image) {
  return await connection.query(
    `INSERT INTO metadata (title, description, url, image) VALUES ($1,$2,$3,$4) RETURNING id;`,
    [title, description, url, image]
  );
}

export async function insertPost(url, userId, description, metadataId) {
  return await connection.query(
    `INSERT INTO posts (url, "userId", description, "metadataId") VALUES ($1,$2,$3,$4)`,
    [url, userId, description, metadataId]
  );
}

export async function insertShare(userId, userName, postId) {
  return await connection.query(
    `INSERT INTO shares ("userId", "userName", "postId") VALUES ($1,$2,$3)`,
    [userId, userName, postId]
  );
}

export async function getAllShares(id) {

  return await connection.query(
    `
    SELECT
    s."userName" AS shared_by_user_name,
    p.id AS post_id,
    p.description AS post_description,
    p.created_at,
    u.id AS user_id,
    u.name AS user_name,
    u."imageUrl" AS user_image_url,
    COALESCE(
      (SELECT
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'user_id', l."userId", 
            'user_name', u2.name
          )
        )
        FROM likes l
        JOIN users u2 ON l."userId" = u2.id
        WHERE l."postId" = p.id
      ),
      '[]'
    ) AS liked_by_users,

    CAST(COUNT(s1.id) AS INTEGER)AS shares_count,

    COALESCE(
      (SELECT
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'commenter_id', c."userId", 
            'commenter_name', u3.name,
            'commenter_image', u3."imageUrl",
            'comment', c."commentText"
          )
        )
        FROM comments c
        JOIN users u3 ON c."userId" = u3.id
        WHERE c."postId" = p.id
      ),
      '[]'
    ) AS commented_by_users,

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
    shares s 
    JOIN posts p ON s."postId" = p.id
    JOIN users u ON p."userId" = u.id
    JOIN followers f ON p."userId" = f.followed
    JOIN followers f2 ON s."userId" = f2.followed
    JOIN shares s1 ON s1."postId" = p.id
  WHERE f.following = ${id}

  GROUP BY
    p.id,
    s1.id,
    s.id,
    u.id

  ORDER BY 
    p.created_at DESC 

  LIMIT 20;
    `
    )
}

export async function insertLike(userId, postId) {
  return await connection.query(
    `INSERT INTO likes ("userId", "postId") VALUES ($1,$2)`,
    [userId, postId]
  );
}

export async function deleteLike(userId, postId) {
  return await connection.query(
    `DELETE FROM likes WHERE "userId"=$1 AND "postId"=$2;`,
    [userId, postId]
  );
}

export async function getPostById(postId) {
  return await connection.query(
    `SELECT * FROM posts WHERE id=$1;`, [postId]
  );
}

export async function getPostsFromUserRepository(id) {
  return await connection.query(
      `
      SELECT p.id AS post_id, p.description AS post_description, u.id AS user_id, u.name AS user_name, u."imageUrl" AS user_image_url,
      COALESCE(
        (SELECT
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'user_id', l."userId", 
              'user_name', u2.name
            )
          )
          FROM likes l
          JOIN users u2 ON l."userId" = u2.id
          WHERE l."postId" = p.id
        ),
        '[]'
      ) AS liked_by_users,

      CAST(COUNT(s.id) AS INTEGER)AS shares_count,
  
      COALESCE(
        (SELECT
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'commenter_id', c."userId", 
              'commenter_name', u3.name,
              'commenter_image', u3."imageUrl",
              'comment', c."commentText"
            )
          )
          FROM comments c
          JOIN users u3 ON c."userId" = u3.id
          WHERE c."postId" = p.id
        ),
        '[]'
      ) AS commented_by_users,
  
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
      LEFT JOIN shares s ON s."postId" = p.id
  
    WHERE u.id = ${id}

    GROUP BY
      p.id,
      s.id,
      u.id
  
    ORDER BY 
      p.created_at DESC 
  
    LIMIT 20;
        `
  );
}

export async function getAllPosts(id) {

  return await connection.query(
    `
    SELECT p.id AS post_id, p.description AS post_description, u.id AS user_id, u.name AS user_name, u."imageUrl" AS user_image_url, p.created_at,
    COALESCE(
      (SELECT
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'user_id', l."userId", 
            'user_name', u2.name
          )
        )
        FROM likes l
        JOIN users u2 ON l."userId" = u2.id
        WHERE l."postId" = p.id
      ),
      '[]'
    ) AS liked_by_users,

    CAST(COUNT(s.id) AS INTEGER)AS shares_count,

    COALESCE(
      (SELECT
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'commenter_id', c."userId", 
            'commenter_name', u3.name,
            'commenter_image', u3."imageUrl",
            'comment', c."commentText"
          )
        )
        FROM comments c
        JOIN users u3 ON c."userId" = u3.id
        WHERE c."postId" = p.id
      ),
      '[]'
    ) AS commented_by_users,

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
    JOIN followers f ON p."userId" = f.followed
    LEFT JOIN shares s ON s."postId" = p.id
  WHERE f.following = ${id} OR p."userId" = ${id}

  GROUP BY
    p.id,
    s.id,
    u.id

  ORDER BY 
    p.created_at DESC 

  LIMIT 20;
    `
    )
}

export async function commentPostRepository(postId, userId, comment){
  return await connection.query(
    `INSERT INTO comments ("postId", "userId", "commentText") VALUES ($1,$2,$3)`,
    [postId, userId, comment]
  );
}
 
export async function deletePostRepository(postId, userId) {
  console.log(Number(postId), userId);

  return await connection.query(
    `
    DELETE FROM posts
    WHERE posts."userId" = $1 AND posts.id = $2
    `
    , [userId, Number(postId)]);
};

export async function updatePostRepository(postId, userId, text) {
  console.log(Number(postId), userId);

  return await connection.query(
    `
    UPDATE posts
    SET description = $3
    WHERE posts."userId" = $1 AND posts.id = $2
    `
    , [userId, Number(postId), text]);
};
