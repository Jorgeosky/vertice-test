import mongoose from 'mongoose';

export interface IProductUpdate {
  id: string;
  amount: number;
}

export interface IProduct extends mongoose.Document {
  _id: mongoose.ObjectId;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProduct>('Product', ProductSchema);
