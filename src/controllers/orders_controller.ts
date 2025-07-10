import { NextFunction, Request, Response } from 'express';
import ordersService from '../services/orders_service';
import productsService from '../services/products_service';
import { IProductUpdate } from '../models/Product';

export class OrdersController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = req.body.products.map((p: IProductUpdate) => ({
        ...p,
        id: p.id,
      })) as IProductUpdate[];
      const { order, validProductsUpdate } = await ordersService.post(
        req.body.user.id,
        products,
      );
      await productsService.updateBulk(validProductsUpdate);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  async getByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const orders = await ordersService.getByUserId(req.body.user.id);
      if (!orders) {
        res.status(404).json({ message: 'orders not found for this user' });
        return;
      }
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
}
