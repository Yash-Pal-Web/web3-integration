import { Response } from 'express';
import { BaseError } from '../error';
import { SERVER_MESSAGE } from '../constant';

function successResponse(res: Response, data: object | null, message?: string): Response {
  return res.json({
    success: true,
    data: data,
    message: message,
  });
}

function errorResponse(res: Response, error: BaseError, code?: number, defaultMessage?: string): Response {
  return res.status(error?.statusCode || code || 400).json({
    success: false,
    message: defaultMessage || error?.message || SERVER_MESSAGE.SERVER_ERROR,
    statusCode: error?.statusCode || code || 400,
    error: error.name || 'ServerError',
  });
}

export { successResponse, errorResponse };
