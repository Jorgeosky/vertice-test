import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.status && err.status !== 200 ? err.status : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Error',
  });
};
