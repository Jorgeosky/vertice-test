import { NextFunction, Request, Response } from 'express';
import service from '../services/auth_service';

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await service.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await service.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
