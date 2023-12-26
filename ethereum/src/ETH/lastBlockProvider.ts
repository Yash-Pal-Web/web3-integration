import config from '../config/env';
import { InternalError } from '../error';
import { EthLastBlock } from './block';
import { Wallet } from '../components/wallet/walletModel';
import { TOKENTYPE } from '../constant/enum';

//import { BigNumberish, formatEther } from 'ethers';

async function lastBlockForEth(isSeeding = false) {
  //
  const lastBlock = await EthLastBlock.findOne({
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

// find wallet address

// check in above function token is equal to eth

async function walletAddressForEth(walletAddress: any) {
  const wallet = await Wallet.findOne({ where: { walletAddress } });
  // if (wallet && wallet.tokenType === 'ETH') {
  //   return wallet;
  // } else {
  //   console.log('Transaction failed');
  // }
  return wallet;
}

// convert value to decimal number

// async function formatEthers(wei: BigNumberish) {
//   const balance = await formatEther(wei);
//   return balance;
// }

async function ehtseedDataToDB() {
  const lastBlock = await lastBlockForEth(true);
  if (!lastBlock) {
    const newblock = new EthLastBlock();
    newblock.lastBlock = config.eth.lastBlock;
    await newblock.save();
  }
}

async function updateEthLastBlock(lastBlock: number) {
  const update = await EthLastBlock.findOne({
    where: {
      isActive: true,
    },
  });
  if (update) {
    update.lastBlock = lastBlock + 1;
    await update.save();
  }
  console.log('updateLastBlock=====++++++++++++>>', update);
  return update;
}

export { lastBlockForEth, updateEthLastBlock, ehtseedDataToDB, walletAddressForEth };
