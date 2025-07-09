import { Router } from 'express';
import { ProductsController } from '../controllers/products_controller';

const controller = new ProductsController();
const router = Router();

router.get('', controller.getAll);
router.get('/:id', controller.getById);

export { router };
