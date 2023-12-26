import { Application } from 'express';
import express from 'express';
import expressLoader from './express';
import db from './dbService';
import exceptionhandler from './uncaughtExceptionHandler';
// import logger from '../utils/logger';
//import crons from '../ETH/cronJob';
//import crons from '../MATIC/cronJob';
// import ethHelper from '../services/EtherJs/eth';
//import Encrypter from '../../utilities/encrypter ';
import Encrypter from '../utils/encrypter';
import seedDataToDb from './seedData';
import startCronServices from './cronProcess';
//import { TokenHelper } from '../services/token/web3Helper';
import matic from '../services/EtherJs/eth';

export default async (): Promise<Application> => {
  const application = express();
  await db.connectDatabase();
  await seedDataToDb();
  await startCronServices();
  await matic.maticTokenTransfer('0x985dFdd1F669b321F86aEF696020b8BdABF96049', '2');

  // Call the transferToken method
  //TokenHelper.transferToken('0xb2ab620AE94b8558236a29d66e8141797b3B750a', 14);
  //crons.start();

  // await ethHelper.ethTransfer(
  //   '0x889dfbc9b2a35f98852d2a306338ae4c4d0f3331',
  //   '0x93c24f1fbd9ec310bfd64362cbd35f18f63a9d1b0x889dfbc9b2a35f98852d2a306338ae4c4d0f3331',
  //  Encrypter.dencrypt(
  //     'fd92b21026e0c04902f54f4b5f75ee09bee52a712c71679a456980736e21657d2d487245ad47ef58a425b7d346d2fdb899e43505c7bc0c3852bd9365ae18947c699c54af529ccb64e42c64fda6133fde|fe988f4f853b5599936bd3b718b2680f',
  //   ),
  //   '0.1',
  // );

  const applicatios: Application = await expressLoader({ app: application });

  //We can start other process here like rabbitmq , cronJobs and other services

  await exceptionhandler();
  return applicatios;
};
