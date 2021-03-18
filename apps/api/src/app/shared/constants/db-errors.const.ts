export const errorCodes = {
  duplicatedValue: 11000,
};

export const DB_ERROR_CODES = 'DB_ERROR_CODES';

export const dbErrorCodes = {
  provide: DB_ERROR_CODES,
  useValue: errorCodes,
};
