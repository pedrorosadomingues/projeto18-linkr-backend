import Joi from 'joi';

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const signupSchema = Joi.object({
  name: Joi
    .string()
    .trim()
    .min(1)
    .required(),
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
  imageUrl: Joi.
    string()
    .trim()
    .uri()
    .required()
});

export default signupSchema;