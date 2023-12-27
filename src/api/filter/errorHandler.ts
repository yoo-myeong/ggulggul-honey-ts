import { ErrorRequestHandler } from 'express';
import { CustomError } from '../../libs/error/CustomError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
