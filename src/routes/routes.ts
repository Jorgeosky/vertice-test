import { Router } from 'express';
import { router as authRouter } from './auth_routes';
import { router as usersRouter } from './users_routes';
import { router as productsRouter } from './products_routes';
import { router as ordersRouter } from './orders_routes';

const router = Router();

router.use('/me', usersRouter);
router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export { router };
