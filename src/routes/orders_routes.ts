import { Router } from 'express';
import { OrdersController } from '../controllers/orders_controller';
import { authMiddleware } from '../middlewares/auth_middleware';

const controller = new OrdersController();
const router = Router();

router.get('', authMiddleware, controller.getByUserId);
router.post('', authMiddleware, controller.post);

export { router };
