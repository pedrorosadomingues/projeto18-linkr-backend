import jwt from 'jsonwebtoken';
import { DAY_TO_MILLISECONDS } from '../utils/Constants.util.js';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../utils/Codes.util.js';
import dotenv from 'dotenv';
import { getUserRepository } from '../repositories/users.repository.js';

dotenv.config();

function createToken(id) {
  const days = 3;
  const key = process.env.SECRET_KEY;
  try {
    const token = jwt.sign({ id }, 'key', {
      expiresIn: DAY_TO_MILLISECONDS * days / 1000
    });

    return token;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
}

async function signinAuth(request, response, next) {
  const { email } = request.body;
  const days = 3;

  try {
    const resultsFromUsers = await getUserRepository(email);

    if (resultsFromUsers.rows.length === 0) return response.sendStatus(UNAUTHORIZED);
  
    const token = createToken(0);

    response.locals.token = token;

    response.cookie('jwt',
      token,
      {
        httpOnly: true,
        maxAge: DAY_TO_MILLISECONDS * days,
      });

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default signinAuth;