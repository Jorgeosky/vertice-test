import mongoose from 'mongoose';
import { IProduct } from './Product';
import { IUser } from './User';

interface OrderedProduct {
  product: mongoose.Types.ObjectId | IProduct;
  amount: number;
}

export interface IOrder extends mongoose.Document {
  user: mongoose.Types.ObjectId | IUser;
  products: OrderedProduct[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder>('Order', OrderSchema);
