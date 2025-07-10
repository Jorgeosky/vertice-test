import mongoose from 'mongoose';
import ENV from './env';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.URI_MONGO);
    mongoose.set('strictQuery', true);
    console.log(`New connection created to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error while connecting to Mongo ${error}`);
    process.exit(1);
  }
};

export default connectDB;
