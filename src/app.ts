// For run testing App
import { Server } from './server';

const server = new Server();
server.routes();
server.initErrorHandler();

export default server.getApp();
