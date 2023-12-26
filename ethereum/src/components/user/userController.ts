import { Request, Response, NextFunction } from 'express';
import { IUserBody, IUserController, IUserService } from '../../types/user';
import { ILogger } from '../../types/logger';
import logger from '../../utils/logger';
import userService from './userService';
import { successResponse } from '../../utils/response';
import { USER_MESSAGE } from '../../constant';

class User implements IUserController {
  /**
   * @function createUser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} res The Response object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      //logger.info(`New user creation api called:::${req.body}`);
      const userdetails: IUserBody = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const result = await userService.createUser(userdetails);
      return successResponse(res, { result }, USER_MESSAGE.USER_CREATED);
    } catch (error: unknown) {
      next(error);
    }
  }
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await userService.loginUser({ email, password });

      return successResponse(res, { ...result }, USER_MESSAGE.LOGGED_USER);
    } catch (error: unknown) {
      next(error);
    }
  }

  //
}
const userController = new User();

export default userController;
