import { getUserRepository } from "../repositories/users.repository.js";
import bcrypt from 'bcrypt';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "../utils/Codes.util.js";

async function signin(request, response, next) {
  const { password, email } = request.body;

  try {
    const { token, resultsFromUsers } = response.locals;

    const userResults = await getUserRepository(email);
    const userPassword = userResults.rows[0].password;

    const passwordHash = bcrypt.compareSync(password, userPassword);
    if (!passwordHash) {
      return response.sendStatus(UNAUTHORIZED);
    }

    return response.status(OK).send({ token, user: resultsFromUsers.rows[0] });
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default signin;
