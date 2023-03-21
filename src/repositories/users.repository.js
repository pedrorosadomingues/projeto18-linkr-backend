import connection from "../database/database.connection.js";

export async function getUserRepository(email) {
  return await connection.query('SELECT * FROM users WHERE email=$1', [email]);
};

export async function findUserById(id) {
  return await connection.query('SELECT * FROM users WHERE id=$1', [id]);
}

export async function insertUserRepository(infos) {
  const { name, email, passwordHashed, imageUrl } = infos;

  return await connection.query(`INSERT INTO users ("name", "email", "password", "imageUrl")
    VALUES ($1, $2, $3, $4)`,
    [name, email, passwordHashed, imageUrl]);
};

export async function getUsersRepository(name) {
  return await connection.query(`SELECT * FROM users WHERE name LIKE '%${name}%'`);
};

export async function getUsersRepository2(name, myId) {
  return await connection.query(`SELECT u.id, u.name, u."imageUrl", COALESCE(f.followed_by_current_user, false) AS is_followed
  FROM users u
  LEFT JOIN (
    SELECT followed, true AS followed_by_current_user
    FROM followers
    WHERE following = ${myId}
  ) f ON u.id = f.followed
  WHERE u.name ILIKE '%${name}%'
  ORDER BY is_followed DESC, u.name ASC;`);
};


