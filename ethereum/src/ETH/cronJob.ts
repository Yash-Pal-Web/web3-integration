/* eslint-disable no-console */
import cron from 'node-cron';
import { Block, Wallet, formatEther } from 'ethers';
import EthHelper from './web3';
import { lastBlockForEth, updateEthLastBlock, walletAddressForEth } from './lastBlockProvider';
//import rabbitMQ from '../rabbitMQ/rabbitMQ';
import { COINSYMBOL, EXCHANGELIST, ROUTEKEY, TOKENTYPE } from '../constant/enum';
import { InternalError } from '../error';
import Database from '../bootstrap/dbService';
import server from '../server';
import { EthLastBlock } from './block';

const schedulerForBalanceStatus = cron.schedule('*/8 * * * * * ', queryBlockForBalance, {
  scheduled: false,
  timezone: 'Asia/Kolkata',
});

async function queryBlockForBalance() {
  let block: Block | null;
  try {
    // Check for ETH token type using find method

    const latestBlockFromNetwork = await EthHelper.providers.getBlockNumber();
    const startBlock = await lastBlockForEth();
    if (!startBlock) {
      throw new InternalError('Block not fount');
      //console.log('start block============>', startBlock);
    } else {
      const lastBlock = startBlock.lastBlock;
      if (lastBlock < latestBlockFromNetwork) {
        block = await EthHelper.providers.getBlock(startBlock?.lastBlock as number, true);
        // start transction process
        const transactionList = block?.prefetchedTransactions;
        // console.log('transction============>>', transactionList);
        if (transactionList) {
          for (let i = 0; i < transactionList.length; i++) {
            const transaction = transactionList[i];
            // console.log('transction=======>', transaction);
            const to = transaction.to;
            const from = transaction.from;
            const walletAddress = await walletAddressForEth(to);
            // console.log('walletAddress======+++++++++++++++++++++>', walletAddress);
            const ethBalance = formatEther(transaction.value);
            console.log('eth balance', ethBalance);
            if (walletAddress && walletAddress.tokenType === TOKENTYPE.ETH) {
              console.log('wallet address==========>>>>222222222222222222', walletAddress, parseFloat(ethBalance));

              walletAddress.balance = walletAddress.balance + parseFloat(ethBalance);
              await walletAddress?.save();
            }
            //console.log('ethBalance=================>>>>>>', ethBalance);
          }
        }
        const updateLastBlock = await updateEthLastBlock(startBlock.lastBlock);
        // console.log('update block============>>', updateLastBlock);
      }
    }
  } catch (error: unknown) {
    console.log('Error Message ===============>', error);
  }
}

export default schedulerForBalanceStatus;
