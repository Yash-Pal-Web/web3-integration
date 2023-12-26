import { Application } from 'express';
import applicationInitialization from './bootstrap';
import http from 'http';
import config from './config/env';
import 'reflect-metadata';
import logger from './utils/logger';
//import matic from './services/EtherJs/eth';

class ServerInstance {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const app: Application = await applicationInitialization();
      const server: http.Server = http.createServer(app);
      //await matic.transferERC20Tokens();
      server.listen(config.PORT, () => {
        logger.info(`server started on ${config.PORT}`);
        logger.info(`server Url http://localhost:${config.PORT}`);
      });
      return server;
    } catch (error: any) {
      logger.error('Error occured when starting server:::', error);
    }
  }
}

export default new ServerInstance();
