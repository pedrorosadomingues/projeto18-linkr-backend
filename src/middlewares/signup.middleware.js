import signupSchema from "../schemas/signup.schema.js";
import { CREATED, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from "../utils/Codes.util.js";

async function validateSignup(request, response, next) {
  const user = request.body;

  try {
    const validation = signupSchema.validate(user);

    console.log('Validation:', validation)

    if (validation.error) {
      console.log('Error on signup validation: ', validation.error.message);

      return response.sendStatus(UNPROCESSABLE_ENTITY);
    }

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default validateSignup;