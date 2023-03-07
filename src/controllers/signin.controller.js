import { INTERNAL_SERVER_ERROR, OK } from "../utils/Codes.util.js";

async function signin(request, response, next) {
  const { password, email } = request.body;

  try {

    return response.status(OK).send('hello');
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signin,
};