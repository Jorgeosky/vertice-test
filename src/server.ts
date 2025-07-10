import express, { json } from 'express';
import cors from 'cors';
import { router as appRoutes } from './routes/routes';
import { errorHandler } from './middlewares/error_middleware';
import { swaggerUi, swaggerDocument, validator } from './config/swagger';
import ENV from './config/env';
export class Server {
  app: express.Application;

  getApp() {
    return this.app;
  }

  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.set('port', ENV.PORT);
    this.app.use(json({ limit: '10mb' }));
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  routes() {
    this.app.use(appRoutes);
  }

  initErrorHandler() {
    this.app.use(errorHandler);
  }

  start() {
    try {
      this.app.use(validator);
      this.routes();
      this.initErrorHandler();
      this.app.listen(this.app.get('port'), () => {
        console.warn(`Server Running on port ${this.app.get('port')}`);
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error(`ERROR : ${error.message} STACK : ${error.stack}`);
    }
  }
}
