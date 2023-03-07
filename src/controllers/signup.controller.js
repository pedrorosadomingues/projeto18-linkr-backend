import bcrypt from 'bcrypt';
import {
  OK,
  CREATED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CONFLICT,
} from '../utils/Codes.util.js';
import { getUserRepository, insertUserRepository } from '../repositories/users.repository.js';

async function getUser(email) {
  try {
    const user = await getUserRepository(email);

    return user;
  } catch (error) {
    console.log('Error on server: ', error);

    throw new Error('Error on query');
  }
};

async function insertUser(infos) {
  try {
    await insertUserRepository(infos);

    return;
  } catch (error) {
    console.log('Error on server: ', error);

    throw new Error('Error on query');
  }
};

async function signup(request, response) {
  const { email, password, name, imageUrl } = request.body;
  const passwordHashed = bcrypt.hashSync(password, 10);

  try {
    if (!email || !password) return response.sendStatus(BAD_REQUEST);

    const user = await getUser(email);

    if (user.rowCount !== 0) return response.sendStatus(CONFLICT);

    await insertUser({
      email,
      passwordHashed,
      name,
      imageUrl
    });

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default signup;