import { NextFunction, Request, Response } from 'express';
import service from '../services/users_service';

export class UsersController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await service.get(req.body.user.id);

      /* const resultApi: UsersApi[] = result.map((result) =>
        usersMapper.fromDomToApi(result),
      ); */

      res.status(200);
      res.json({
        status: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
