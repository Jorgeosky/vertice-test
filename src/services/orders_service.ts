import mongoose from 'mongoose';
import Order, { IOrder } from '../models/Order';
import Product, { IProduct, IProductUpdate } from '../models/Product';
import { ApiError } from '../utils/ApiError';

const post = async (
  userId: string,
  productsUpdate: IProductUpdate[],
): Promise<any> => {
  if (!productsUpdate.length) {
    throw new ApiError(400, 'Debes incluir al menos un producto');
  }
  const validProducts = productsUpdate.filter(
    (p: IProductUpdate) =>
      mongoose.Types.ObjectId.isValid(p.id) && p.amount > 0,
  );
  const products: IProduct[] = await Product.find({
    _id: {
      $in: validProducts.map((p) => new mongoose.Types.ObjectId(p.id)),
    },
  });
  if (!products.length) {
    throw new ApiError(404, 'No se encontraron productos válidos');
  }
  if (products.filter((p) => p.stock == 0).length) {
    throw new ApiError(
      400,
      'Alguno de los productos no tienen stock disponible',
    );
  }
  if (
    products.filter(
      (p) =>
        p.stock <
        validProducts.find((vp) => vp.id === p._id.toString())!.amount,
    ).length
  ) {
    throw new ApiError(
      400,
      'Alguno de los productos no tiene suficiente stock para su compra',
    );
  }
  const mapValidProducts = new Map(validProducts.map((p) => [p.id, p.amount]));
  const validProductsUpdate: IProductUpdate[] = products
    .filter(({ _id }) => mapValidProducts.has(_id.toString()))
    .map(({ _id }) => ({
      id: _id.toString(),
      amount: mapValidProducts.get(_id.toString())!,
    }));
  const total = products.reduce(
    (sum, p) =>
      sum +
      (productsUpdate.find((value) => value.id == p._id.toString())?.amount ||
        0) *
        p.price,
    0,
  );
  const order = new Order({
    user: userId,
    products: products.map((p) => ({
      product: p._id,
      amount: validProducts.find((value) => value.id == p._id.toString())
        ?.amount,
    })),
    total,
  });
  return {
    order: await order.save(),
    validProductsUpdate,
  };
};

const getByUserId = async (userId: string): Promise<IOrder[]> => {
  return await Order.find({ user: userId })
    .populate('products')
    .sort({ createdAt: -1 });
};

export default {
  post,
  getByUserId,
};
