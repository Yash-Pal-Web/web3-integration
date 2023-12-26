import path from 'path';
import winston from 'winston';
import { ILogger } from '../types';
// import { Logger } from '../types/index';

/* eslint-disable no-console */
class Logger implements ILogger {
  private readonly logger!: winston.Logger;

  constructor() {
    const { combine, timestamp, printf } = winston.format;

    const logspath = path.join(__dirname, '..', '..', 'logs');

    const myFormat = printf(({ level, message, timestamp }) => `${timestamp}  ${level}: ${message}`);

    const date = new Date().getUTCDate();
    const filename = `${logspath}/${date}.log`;

    this.logger = winston.createLogger({
      level: 'info',
      format: combine(timestamp(), myFormat),
      transports: [new winston.transports.File({ filename: filename, level: 'info' })],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console());
    }
  }

  warn(...data: any[]) {
    console.log(data);
  }
  error(...data: any[]) {
    console.log(data);
  }
  info(...data: any[]) {
    console.log(data);
  }
}

export default new Logger();
