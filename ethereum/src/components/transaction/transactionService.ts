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

import { Transaction } from './transaction';
import { comparePassword, generateToken } from '../../utils/jwt';

import eth from '../../services/EtherJs/eth';
import encrypter from '../../utils/encrypter';
import { UserMessages } from '../../utils/constant';
import { BadRequest } from '../../error';
import ethHelper from '../../services/EtherJs/eth';
import Encrypter from '../../utils/encrypter';
import { DataSource } from 'typeorm/data-source/DataSource';
import dbService from '../../bootstrap/dbService';
import { Wallet } from '../wallet/walletModel';
import { PROJECTSTATUS, TRANSACTIONTYPE } from '../../constant/enum';

class transactionService {
  // private readonly userRepository: IUserRepository;
  // constructor(private readonly logger: ILogger, private readonly repository: IWalletRepository) {
  //   this.logger = logger;
  //   this.repository = repository;
  // }
  // constructor(private readonly logger: ILogger) {
  //   this.logger = logger;
  // }
  constructor(private readonly logger: ILogger, private readonly database: DataSource) {
    this.logger = logger;
  }

  // async createWallet(usedId: string): Promise<Wallet | null> {
  //   this.logger.info(usedId);
  //   const newWallet = await this.repository.createWallet(usedId);

  //   return newWallet;
  // }

  // update transaction
  async updateProjectStatus(address: string, walletId: string) {
    try {
      await Transaction.query(
        `UPDATE tokens SET  tokens.contractAddress="${address}",tokens.projectStatus="${PROJECTSTATUS.UPCOMING}" WHERE tokens.tokenId="${walletId}";`,
      );
    } catch (error) {
      logger.error('error updating project', error);
    }
  }

  async ethWithdrawal(
    data: { balance: number; to: string; from: string },
    txHashId: string,
    walletId: string,
  ): Promise<Transaction> {
    const userWallet = await Wallet.findOne({ where: { walletId }, relations: ['transactions'] });
    console.log('user wallet id================>', userWallet);
    if (!userWallet) {
      throw new BadRequest('Wallet not found');
    }
    const withdrawTransaction = new Transaction();
    console.log('withdrawalTransaction=========>', withdrawTransaction);
    withdrawTransaction.balance = data.balance;
    withdrawTransaction.to = data.to;
    withdrawTransaction.from = data.from;
    withdrawTransaction.txType = TRANSACTIONTYPE.WITHDRAW;
    //withdrawTransaction.txHashId =
    withdrawTransaction.wallet = userWallet;
    withdrawTransaction.txHashId = txHashId;

    return withdrawTransaction.save();
  }
}

//export default new walletService(logger, walletRepository);
export default new transactionService(logger, dbService.AppDataSource);
