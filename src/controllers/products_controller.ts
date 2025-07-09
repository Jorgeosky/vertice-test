import { NextFunction, Request, Response } from 'express';
import service from '../services/products_service';

export class ProductsController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await service.getAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await service.getById(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}
