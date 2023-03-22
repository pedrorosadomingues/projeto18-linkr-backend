import Joi from 'joi';

export const postSchema = Joi.object({
  url: Joi
    .string().uri().trim().required(),
  description: Joi.
    string().allow(""),
});

export default postSchema;