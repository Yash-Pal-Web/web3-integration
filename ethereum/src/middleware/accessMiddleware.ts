import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode, USER_MESSAGE } from '../constant';
import { AuthenticationError } from '../error';

/**
 * @function userOnly
 * @description This function is used as access controle, it will allow the user only to access the api.
 * @param req
 * @param res
 * @param next
 */
function userOnly(req: Request, res: Response, next: NextFunction) {
  const userid = req.params?.userid || req.query?.userid || req.body?.userid;
  if (req.user && req.user?.userId == userid) {
    next();
  } else {
    next(new AuthenticationError(USER_MESSAGE.ACCESS_DENIED, true, HttpStatusCode.FORBIDDEN));
  }
}

export { userOnly };
