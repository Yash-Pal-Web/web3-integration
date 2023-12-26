import { IUserRepository } from '../../types';
import { DataSource } from 'typeorm';
import { BadRequest } from '../../error';
import dbService from '../../bootstrap/dbService';
import { UserMessages } from '../../utils/constant';
import config from '../../config/env';
import { Wallet } from './walletModel';
import { encryptPassword } from '../../utils/jwt';
import eth from '../../services/EtherJs/eth';
import encrypter from '../../utils/encrypter';
import { TOKENTYPE } from '../../constant/enum';
//import { comparePassword } from '../../utils/jwt';

class WalletRepository {
  //private readonly userRepository: Repository<User>;
  // inject database
  constructor(private readonly database: DataSource, private readonly WalletModel: typeof Wallet) {}
  // async createWallet(userId: string): Promise<Wallet> {
  //   const userwallet = await Wallet.findOne({ where: { userId } });
  //   if (userwallet) throw new BadRequest(UserMessages.WALLET_ALREADY);
  //   const wallet = await eth.createETHWallet();
  //   const newWallet = new this.WalletModel();
  //   newWallet.userId = userId;
  //   newWallet.walletAddress = wallet.publicAddress;
  //   newWallet.walletPrivateKey = encrypter.encrypt(wallet.privateKey);
  //   return newWallet.save();
  // }
  async findWallet(userId: string, tokenType: TOKENTYPE): Promise<Wallet[] | null> {
    const userWallet = await Wallet.find({ where: { userId: userId, tokenType: tokenType } });
    //if (userWallet) throw new BadRequest(UserMessages.WALLET_ALREADY);
    // return userWallet;
    return userWallet;
  }

  // async findWallet(userId: string): Promise<Wallet[]> {
  //   const userWallet = await Wallet.find({ where: { userId: userId } });
  //   //if (userWallet) throw new BadRequest(UserMessages.WALLET_ALREADY);
  //   // return userWallet;
  //   return userWallet;
  // }
}

export default new WalletRepository(dbService.AppDataSource, Wallet);
