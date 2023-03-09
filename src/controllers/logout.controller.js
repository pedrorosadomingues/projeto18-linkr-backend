import { INTERNAL_SERVER_ERROR, NO_CONTENT } from '../utils/Codes.util.js';

async function logout(request, response) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {

    return response.sendStatus(NO_CONTENT);
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default logout ;
