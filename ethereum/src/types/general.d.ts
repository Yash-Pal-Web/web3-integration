import { Multer } from 'multer';
import { Request, Response, NextFunction } from 'express';

//// <reference path="./user.d.ts" />
export interface JWTPAYLOAD {
  userId?: string;
  email?: string;
  //accountType?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: JWTPAYLOAD;
      file: Multer;
    }
  }
}

type controllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
