import { Wallet } from '../components/wallet/walletModel';
import config from '../config/env';
import { InternalError } from '../error';
import { MaticLastBlock } from './maticLastBlock';

async function lastBlockForMatic(isSeeding = false) {
  //
  const lastBlock = await MaticLastBlock.findOne({
    where: {
      isActive: true,
    },
  });
  if (isSeeding) return lastBlock;
  if (!lastBlock) {
    // seed data
    throw new InternalError('seeding last block..please wait!!!!!!!!!!!!!!!!!!!');
  }
  return lastBlock;
}

async function maticseedDataToDB() {
  const lastBlock = await lastBlockForMatic(true);
  if (!lastBlock) {
    const newblock = new MaticLastBlock();
    newblock.lastBlock = config.matic.lastBlock;
    await newblock.save();
  }
}

async function updateMaticLastBlock(lastBlock: number) {
  const update = await MaticLastBlock.findOne({
    where: {
      isActive: true,
    },
  });
  if (update) {
    update.lastBlock = lastBlock + 1;
    await update.save();
  }
  return update;
}
async function walletAddressForUSDT(to: string) {
  const wallet = await Wallet.findOne({
    where: { walletAddress: to },
  });
  console.log('wallet===========================>>>', wallet);
  return wallet;
}

export { lastBlockForMatic, updateMaticLastBlock, maticseedDataToDB, walletAddressForUSDT };
