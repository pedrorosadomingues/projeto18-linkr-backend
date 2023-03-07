import { getUserRepository } from "../repositories/users.repository.js";
import bcrypt from 'bcrypt';
import { INTERNAL_SERVER_ERROR, OK } from "../utils/Codes.util.js";

async function signin(request, response, next) {
  const { password, email } = request.body;

  try {
    const { token } = response.locals;

    const userResults = await getUserRepository(email);
    const userPassword = userResults.rows[0].password;

    const passwordHash = bcrypt.compareSync(password, userPassword);
    if (!passwordHash) {
      return response.sendStatus(UNAUTHORIZED);
    }

    return response.status(OK).send({ token });
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signin,
};