import Joi from 'joi';

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const signinSchema = Joi.object({
  email: Joi
    .string()
    .trim()
    .min(1)
    .regex(new RegExp(emailPattern))
    .error((error) => new Error(error))
    .required(),
  password: Joi.
    string()
    .trim()
    .min(1)
    .required(),
});

export default signinSchema;
