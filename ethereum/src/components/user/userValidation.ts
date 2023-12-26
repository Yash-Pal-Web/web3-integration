import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../error';

class UserValidation {
  //constructor(private logger: Logger) {}
  async createUserValidation(req: Request, res: Response, next: NextFunction) {
    //firstname,lastname,emailId,password
    try {
      const schema = Joi.object({
        username: Joi.string().alphanum().min(2).max(50).required(),
        password: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error, true);
      } else {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserValidation();
