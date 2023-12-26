import { User } from '../components/user/userModel';
import { Wallet } from '../components/wallet/walletModel';

export interface IUserController {
  createUser: controllerFunction;
}

export interface IUserBody {
  username: string;
  email: string;
  age?: string;
  password: string;
  name?: string;
}
export interface LoginResponse {
  email: string;
  password: string;
  //token: string | null;
}

export interface IWalletBody {
  userId: string;
}

export interface IUser {
  name: string;
  age: number;
}

export interface IUserRepository {
  create: (email: string, passowrd: string, username: string) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}

// export interface IWalletRepository {
//   findWallet: (userId: string) => Promise<Wallet | null>;
// }

export interface IUserService {
  createUser: (data: IUserBody) => Promise<any>;
}
