import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  return res.status(500).json();
};
