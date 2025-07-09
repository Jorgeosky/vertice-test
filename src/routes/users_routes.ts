import { Router } from 'express';
import { UsersController } from '../controllers/users_controller';
import { authMiddleware } from '../middlewares/auth_middleware';

const controller = new UsersController();
const router = Router();

router.get('', authMiddleware, controller.get);

export { router };
