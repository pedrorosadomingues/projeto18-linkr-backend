import Joi from 'joi';


const postSchema = Joi.object({
  url: Joi
    .string().uri().trim().required(),
  description: Joi.
    string().allow(""),
});

export default postSchema;