import mongoose from 'mongoose';
import Product, { IProduct, IProductUpdate } from '../models/Product';
import { ApiError } from '../utils/ApiError';

const getById = async (productId: string | null): Promise<IProduct> => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, 'Producto no encontrado');
  }

  return product;
};

const getAll = async (): Promise<IProduct[]> => {
  const products = await Product.find();

  if (!products) {
    throw new ApiError(404, 'No hay productos actualmente');
  }

  return products;
};

const updateBulk = async (products: IProductUpdate[]): Promise<void> => {
  const productsToUpdated = products.map((p) => ({
    updateOne: {
      filter: { _id: new mongoose.Types.ObjectId(p.id) },
      update: { $inc: { stock: -p.amount } },
    },
  }));
  await Product.bulkWrite(productsToUpdated);
};

export default { getById, getAll, updateBulk };
