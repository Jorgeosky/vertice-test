import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import usersService from '../services/users_service';
import { ApiError } from '../utils/ApiError';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    const user = usersService.get(decoded.userId);
    if (!user) {
      throw new ApiError(401, 'Token inválido o expirado');
    }
    req.body.user = { id: decoded.userId };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: 'Token inválido o expirado' });
  }
};
