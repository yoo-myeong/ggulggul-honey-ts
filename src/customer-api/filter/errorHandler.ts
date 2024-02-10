import { ErrorRequestHandler } from 'express';
import { CustomError } from './CustomError';

// eslint-disable-next-line
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  if (CustomError.isCustomError(err)) {
    res.status(err.statusCode);
    if (process.env.NODE_ENV !== 'prod') {
      res.json({
        message: err.message,
      });
    }

    return res;
  }

  return res.status(500).json({
    message: 'internal server error',
  });
};
