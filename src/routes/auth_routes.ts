import { Router } from 'express';
import { AuthController } from '../controllers/auth_controller';

const controller = new AuthController();
const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

export { router };
