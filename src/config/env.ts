import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido en el archivo .env');
}

if (!process.env.URI_MONGO) {
  throw new Error('MONGO_URI no definido en el archivo .env');
}

export default {
  PORT: process.env.PORT || 3000,
  URI_MONGO: process.env.URI_MONGO || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  NODE_ENV: process.env.JWT_EXPIRES_IN || 3600,
};
