require('dotenv').config();
import mongoose, { Mongoose } from 'mongoose';
import db from './config/db';

let conn: Mongoose | null = null;

const main = async () => {
  try {
    /**To take the enviroment variables */
    //await loadenv.default();
    await startWebApp();
    await db();
    //await getRoleList();
  } catch (err: unknown) {
    if (err instanceof Error)
      console.error(`ERROR : ${err.message} STACK : ${err.stack}`);
  }
};

const startWebApp = async () => {
  /**Express server */
  const { Server } = await import('./server');
  const server = new Server();
  server.start();
};

main();
