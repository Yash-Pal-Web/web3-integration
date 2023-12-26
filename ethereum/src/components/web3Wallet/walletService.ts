import {
  IUserBody,
  IUserRepository,
  IUserService,
  IWalletBody,
  // IWalletRepository,
  LoginResponse,
} from '../../types/user';
import { ILogger } from '../../types';
import logger from '../../utils/logger';

import { Web3Wallet } from './walletModel';

//import walletRepository from './walletRepository';
import eth from '../../services/web3Js/eth';
import encrypter from '../../utils/encrypter';
import { UserMessages } from '../../utils/constant';
import { BadRequest } from '../../error';
import ethHelper from '../../services/EtherJs/eth';
import Encrypter from '../../utils/encrypter';
import { DataSource } from 'typeorm/data-source/DataSource';
import dbService from '../../bootstrap/dbService';
import { Transaction } from '../transaction/transaction';
import { TOKENTYPE, TRANSACTIONSTATUS } from '../../constant/enum';

class walletService {
  constructor(private readonly logger: ILogger, private readonly database: DataSource) {
    this.logger = logger;
  }

  async createWallet(userId: string, tokenType: TOKENTYPE): Promise<Web3Wallet> {
    const existingWallet = await Web3Wallet.find({ where: { userId: userId, tokenType: tokenType } });

    if (existingWallet && existingWallet.length > 0) {
      throw new BadRequest(UserMessages.TOKEN_TYPE_ALREADY_EXISTS);
    }

    const wallet = await eth.createETHWallet();
    const newWallet = new Web3Wallet();
    newWallet.userId = userId;
    newWallet.tokenType = tokenType;
    newWallet.walletAddress = wallet.publicAddress;
    newWallet.walletPrivateKey = encrypter.encrypt(wallet.privateKey);
    return newWallet.save();
  }

  //   async transferEthBalance(to: any, walletId: any, amounts: any) {
  //     // const userWallet = await walletRepository.findWallet(userId);

  //     const userWallet = await this.database
  //       .getRepository(Wallet)
  //       .createQueryBuilder('userWallet')
  //       .addSelect('userWallet.walletPrivateKey')

  //       .where('userWallet.walletId = :walletId', { walletId: walletId })
  //       .getOne();
  //     console.log('usewwall', userWallet);
  //     if (!userWallet) throw new BadRequest('account not found');
  //     // Check if the wallet balance is less than the requested amount
  //     const walletBalance = userWallet.balance;

  //     if (walletBalance < amounts) {
  //       throw new BadRequest('Insufficient balance');
  //     }

  //     //decrypt private key

  //     console.log('hkjdkj', userWallet.walletPrivateKey);
  //     const decrypted_private_key = encrypter.dencrypt(userWallet?.walletPrivateKey as string);
  //     console.log('devgn', decrypted_private_key);
  //     const ethTransfer = await ethHelper.ethTransfer(to, userWallet?.walletAddress, decrypted_private_key, amounts);
  //     console.log('ethTransfer========>>>>', ethTransfer);

  //     // calculate gas price
  //     const gasFee = await ethHelper.calculateGasFee(to, userWallet?.walletAddress, decrypted_private_key, amounts);
  //     //console.log('gass fee===========>', gasFee);

  //     // Update the user's balance in the database after deduction
  //     const newBalance = walletBalance - amounts;
  //     userWallet.balance = newBalance;
  //     await this.database.getRepository(Wallet).save(userWallet);
  //     //await userWallet.save();

  //     // Create a new Transaction record associated with the userWallet
  //     const newTransaction = new Transaction();
  //     newTransaction.balance = amounts;
  //     newTransaction.to = to;
  //     newTransaction.from = userWallet.walletAddress;
  //     newTransaction.wallet = userWallet;
  //     newTransaction.status = TRANSACTIONSTATUS.COMPLETED;
  //     newTransaction.txHashId = ethTransfer;
  //     newTransaction.fee = gasFee.toString();

  //     // Save the new Transaction record
  //     await this.database.getRepository(Transaction).save(newTransaction);

  //     return ethTransfer;
  //   }
}

export default new walletService(logger, dbService.AppDataSource);
