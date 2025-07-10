import db from './config/db';

export const main = async () => {
  try {
    await startWebApp();
    await db();
  } catch (err: unknown) {
    if (err instanceof Error)
      console.error(`ERROR : ${err.message} STACK : ${err.stack}`);
  }
};

const startWebApp = async () => {
  const { Server } = await import('./server');
  const server = new Server();
  server.start();
};

main();
