import config from '../config/env';
import { DataSource } from 'typeorm';
import logger from '../utils/logger';
import { User } from '../components/user/userModel';
import { SERVER_MESSAGE } from '../constant';
import { Wallet } from '../components/wallet/walletModel';
import { EthLastBlock } from '../ETH/block';
import { Transaction } from '../components/transaction/transaction';
import { MaticLastBlock } from '../MATIC/maticLastBlock';
import { USDTLastBlock } from '../USDT/usdtLastBlock';
import { UserKyc } from '../components/user/kycModel';
import { Web3Wallet } from '../components/web3Wallet/walletModel';

class Database {
  public AppDataSource: DataSource;

  constructor() {
    this.AppDataSource = new DataSource({
      type: 'mysql',
      host: config.dbconfig.dbhost,
      port: config.dbconfig.dbport,
      username: config.dbconfig.dbuser,
      password: config.dbconfig.dbpassword,
      database: config.dbconfig.dbname,
      entities: [User, Wallet, EthLastBlock, Transaction, MaticLastBlock, USDTLastBlock, UserKyc, Web3Wallet],
      synchronize: true,
      logging: false,
    });
  }

  async connectDatabase() {
    (await this.AppDataSource.initialize()).synchronize(false).then(() => {
      logger.info(SERVER_MESSAGE.DATABASE_CONNECTION);
    });
  }
}

export default new Database();
