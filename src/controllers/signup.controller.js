import connection from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import {
  OK,
  CREATED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CONFLICT,
} from '../utils/Codes.util.js';


async function signup(request, response) {
  const { email, password, name, imageUrl } = request.body;
  const passwordHashed = bcrypt.hashSync(password, 10);

  try {

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signup,
}