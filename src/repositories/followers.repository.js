import connection from "../database/database.connection.js";


export async function followRepository(followed_id, following_id){
  return await connection.query(
      `INSERT INTO followers ("followed", "following") VALUES ($1,$2)`,
      [followed_id, following_id]
    );
}

export async function unfollowRepository(followed_id, following_id){
  return await connection.query(
      `DELETE FROM followers WHERE "followed"=$1 AND "following"=$2;`,
      [followed_id, following_id]
    );
}

export async function getIsFollowingRepository(followed_id, following_id){
  return await connection.query(
      `SELECT * FROM followers WHERE followed=$1 AND "following"=$2;`,[followed_id, following_id]
    );
}

export async function allFollowings(id){
  return await connection.query(
      `SELECT COUNT(*) AS num_following
      FROM followers f
      JOIN users u ON f.followed = u.id
      WHERE f.following = ${id};
      `
    );
}
