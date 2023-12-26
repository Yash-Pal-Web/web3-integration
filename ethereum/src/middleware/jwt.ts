import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from '../error';
import { SERVER_MESSAGE } from '../constant';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  //Bearer Authorization
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new AuthenticationError(SERVER_MESSAGE.TOKEN_NOT_FOUND);
    }
    const tokens = auth?.split(' ');
    if (tokens?.length !== 2) {
      throw new AuthenticationError(SERVER_MESSAGE.JWT_MALFORMED_EXPIRED);
    }
    const [, token] = tokens;
    //verify token
    if (!process.env.JWT_SECRET_KEY) {
      throw new AuthenticationError(SERVER_MESSAGE.JWT_MALFORMED_EXPIRED);
    } else {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (typeof payload == 'object')
        req.user = {
          userId: payload.userId,
        };
      next();
    }
  } catch (error) {
    next(error);
  }
}

export { verifyToken };
