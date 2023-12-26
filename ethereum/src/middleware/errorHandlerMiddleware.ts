/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from 'express';
import { errorResponse } from '../utils/response';
import { JsonWebTokenError } from 'jsonwebtoken';
import { BaseError } from '../error';
import { SERVER_MESSAGE } from '../constant';

function errorHandler(err: BaseError, req: any, res: Response, _next: NextFunction) {
  if (err instanceof JsonWebTokenError) {
    return errorResponse(res, err, 401, SERVER_MESSAGE.SERVER_ERROR);
  }

  return errorResponse(res, err);
}

export { errorHandler };
