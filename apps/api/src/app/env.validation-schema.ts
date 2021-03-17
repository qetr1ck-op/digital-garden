import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGODB_PATH: Joi.string().required(),
})