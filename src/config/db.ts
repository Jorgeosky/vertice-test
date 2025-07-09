import mongoose from 'mongoose';

const uri = process.env.URI_MONGO || '';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    mongoose.set('strictQuery', true);
    console.log(`New connection created to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error while connecting to Mongo ${error}`);
    process.exit(1); // Detener la app si no se conecta
  }
};

export default connectDB;
