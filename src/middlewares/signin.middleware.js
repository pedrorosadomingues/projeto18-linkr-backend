import signinSchema from "../schemas/signin.schema.js";
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from "../utils/Codes.util.js";

async function validateSignin(request, response, next) {
  const user = request.body;

  try {
    const validation = signinSchema.validate(user);

    console.log(validation)

    if (validation.error) {
      console.log('Error on signin validation: ', validation.error.message);

      return response.sendStatus(UNPROCESSABLE_ENTITY);
    }

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default validateSignin;
