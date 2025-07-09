import express, { json } from 'express';
import cors from 'cors';
import { router as appRoutes } from './routes/routes';

const HTTP_PORT = process.env.PORT || 3000;

export class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.set('port', HTTP_PORT);
    this.app.use(json({ limit: '10mb' }));
    this.app.use(cors());
    this.app.options('*', cors());
  }

  routes() {
    this.app.use(appRoutes);
  }

  initErrorHandler() {
    /**Error Handler */
    // this.app.use(errorHandler);
  }

  start() {
    try {
      this.routes();
      this.initErrorHandler();
      this.app.listen(this.app.get('port'), () => {
        console.warn(
          `🆗 Express Application Running on port ${this.app.get('port')}`,
        );
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error(`ERROR : ${error.message} STACK : ${error.stack}`);
    }
  }
}
