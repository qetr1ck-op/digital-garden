import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGODB_PATH: Joi.string().required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),

  BCRYPT_SALT: Joi.string().required(),
});
