import { IUserRepository } from '../../types';
import { DataSource } from 'typeorm';
import dbService from '../../bootstrap/dbService';
import { User } from './userModel';
import { encryptPassword } from '../../utils/jwt';
import { BadRequest } from '../../error';
import { UserMessages } from '../../utils/constant';
//import { comparePassword } from '../../utils/jwt';

class UserRepository implements IUserRepository {
  //private readonly userRepository: Repository<User>;
  // inject database
  constructor(private readonly database: DataSource, private readonly UserModel: typeof User) {}
  async create(email: string, passowrd: string, username: string): Promise<User> {
    const user = await this.UserModel.findOne({ where: { email } });
    if (user) throw new BadRequest(UserMessages.USER_ALREADY);
    const newUser = new this.UserModel();
    const hashedPassword = await encryptPassword(passowrd);
    newUser.email = email;
    newUser.password = hashedPassword;

    newUser.userName = username;

    return newUser.save();
  }

  async findByEmail(email: string) {
    // const user = await this.UserModel.findOne({
    //   where: {
    //     email,
    //   },
    // }); // Find user by email

    const user = await this.database
      .getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')

      .where('user.email = :email', { email: email })
      .getOne();

    if (!user) {
      return null;
    }

    return user;
  }
}

export default new UserRepository(dbService.AppDataSource, User);
