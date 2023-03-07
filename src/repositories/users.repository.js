import connection from "../database/database.connection.js";

export async function getUserRepository(email) {
	return await connection.query('SELECT * FROM users WHERE email=$1', [email]);
};

export async function insertUserRepository(infos) {
  const {name, email, passwordHashed, imageUrl} = infos;

	return await connection.query(`INSERT INTO users ("name", "email", "password", "imageUrl")
    VALUES ($1, $2, $3, $4)`,
      [name, email, passwordHashed, imageUrl]);
};

export async function createSessionRepository(id, token) {
  try {
    await connection
      .query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);
  } catch (error) {
    console.log('Error on server: ', error);

    throw new Error(error);
  }
};
