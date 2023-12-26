import config from '../config/env';
import { InternalError } from '../error';
import { USDTLastBlock } from './usdtLastBlock';

async function lastBlockForUsdt(isSeeding = false) {
  const lastBlock = await USDTLastBlock.findOne({
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

// seed data to USDT last block

async function usdtSeedDataToDB() {
  const lastBlock = await lastBlockForUsdt(true);
  if (!lastBlock) {
    const newblock = new USDTLastBlock();
    newblock.lastBlock = config.usdt.lastBlock;
    await newblock.save();
  }
}

async function updateUsdtLastBlock(lastBlock: number) {
  const update = await USDTLastBlock.findOne({
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

export { usdtSeedDataToDB, updateUsdtLastBlock };
