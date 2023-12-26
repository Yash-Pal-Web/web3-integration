import { IUserBody, IUserRepository, IUserService, LoginResponse } from '../../types/user';
import { ILogger } from '../../types';
import logger from '../../utils/logger';
import userRepository from './userRepository';
import { User } from './userModel';
import { comparePassword, generateToken } from '../../utils/jwt';

class UserService implements IUserService {
  constructor(private readonly logger: ILogger, private readonly repository: IUserRepository) {
    this.logger = logger;
    this.repository = repository;
  }

  async createUser(userdata: IUserBody): Promise<User> {
    this.logger.info(userdata);
    const newUser = await this.repository.create(userdata.email, userdata.password, userdata.username);
    delete newUser.password;
    return newUser;
  }
  async loginUser(logindata: LoginResponse): Promise<object | null> {
    const loginUser = await this.repository.findByEmail(logindata.email);

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await comparePassword(logindata.password, loginUser?.password as string);

    // console.log('isPassword=============+++++++++++++++++++=', isPasswordValid);
    if (!isPasswordValid) {
      // throw new BadRequest(USERMESSAGE.LOGIN_ERROR);
      return null;
    }

    const token = await generateToken({ userId: loginUser?.userId, email: loginUser?.email });
    if (loginUser?.password) {
      delete loginUser.password;
    }

    return { loginUser, token };
  }
}

export default new UserService(logger, userRepository);
