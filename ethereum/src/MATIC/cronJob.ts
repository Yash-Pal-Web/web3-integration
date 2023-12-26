// Assuming MaticLastBlock is a model for the last block data
// Adjust this part according to your project setup

// own code
import contract from './maticConnection';
import cron from 'node-cron';
import { MaticLastBlock } from './maticLastBlock';
import { InternalError } from '../error';
import config from '../config/env';
import EtherJs from './maticConnection';
import transactionevent from './event';
import { walletAddressForUSDT } from './maticBlockHelper';
import { format } from 'path';
import { formatEther } from 'ethers';
import { TOKENTYPE } from '../constant/enum';

async function queryBlockForProjectStatus() {
  try {
    const lastBlockData = await MaticLastBlock.findOne({
      where: {
        isActive: true,
      },
    });

    let fromBlock = lastBlockData?.lastBlock;
    //console.log('fromBlock', fromBlock);
    const latestBlock = await EtherJs.providers.getBlockNumber();
    //console.log('latestblock', latestBlock);

    if (!fromBlock) {
      throw new InternalError('Initial setup for block. Block is being added, please wait!!!!!!!!!!!!!!');
    }

    let toBlock = fromBlock + config.BATCH_SIZE;
    if (toBlock <= latestBlock && toBlock - fromBlock > 0) {
      // Process batch from 'fromBlock' to 'toBlock'
      // console.log(`Processing batch from block ${fromBlock} to block ${toBlock}`);

      // Ensure 'toBlock' doesn't exceed 'latestBlock'
      if (toBlock > fromBlock) {
        toBlock = latestBlock;
      }

      const filter = contract.r_contract.filters.Transfer();
      console.log('Filter ========>', filter);
      console.table({ INSIDE: true, fromBlock, toBlock, batch: toBlock - fromBlock });
      const logs = await contract.r_contract.queryFilter(filter, 43706720, 43706758);
      //const logs = await contract.r_contract.queryFilter(filter, fromBlock, toBlock);
      console.log('logs===============>>>>', logs);
      for (const transaction of logs) {
        const t: any = transaction;
        const to = t['args'][1];
        const from = t['args'][0];
        //const walletAddress = await walletAddressForUSDT('0x9ee785e2e1ff29c46689e4d47b22c89bf7ece7b0');
        const walletAddress = await walletAddressForUSDT(to);

        const ethBalance = formatEther(t['args'][2]);

        if (walletAddress && walletAddress.tokenType === TOKENTYPE.USDT) {
          // console.log('wallet address==========>>>>222222222222222222', walletAddress, parseFloat(ethBalance));

          walletAddress.balance = walletAddress.balance + parseFloat(ethBalance);
          await walletAddress?.save();
        }
      }

      // update project status
      // transactionevent.emit('updateProjectStatus', logs);
      transactionevent.emit('updateblock', toBlock);

      // Update 'fromBlock' and 'toBlock' for the next batch
      fromBlock = toBlock + 1;
      toBlock = fromBlock + config.BATCH_SIZE;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

const schedulerForProjectStatus = cron.schedule('*/4 * * * * *', queryBlockForProjectStatus, {
  scheduled: false,
  timezone: 'Asia/Kolkata',
});

export { schedulerForProjectStatus as PROJECTBLOCKCRONPROCESS };
