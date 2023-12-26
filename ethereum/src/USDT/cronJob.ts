/* eslint-disable no-console */
import cron from 'node-cron';
import { InternalError } from '../error';
import config from '../config/env';
import web3 from './web3';
//import transactionevent from './event';
import { USDTLastBlock } from './usdtLastBlock';

async function queryBlockFoRProjectStatus() {
  try {
    const lastBlockData = await USDTLastBlock.findOne({
      where: {
        isActive: true,
      },
    });

    let fromBlock = lastBlockData?.lastBlock;
    //console.log('fromBlock', fromBlock);
    const latestBlock = await web3.providers.getBlockNumber();
    //console.log('latestblock', latestBlock);

    if (!fromBlock) {
      throw new InternalError('Initial setup for block. Block is being added, please wait!!!!!!!!!!!!!!');
    }

    let toBlock = fromBlock + config.BATCH_SIZE;
    while (toBlock < latestBlock) {
      // Process batch from 'fromBlock' to 'toBlock'
      console.log(`Processing batch from block ${fromBlock} to block ${toBlock}`);

      // Ensure 'toBlock' doesn't exceed 'latestBlock'
      if (toBlock > fromBlock) {
        toBlock = latestBlock;
      }

      // Your logic to handle data retrieval or processing within this batch range goes here
      //console.log('r_contranct address============>', contract.r_contract);

      const filter = web3.r_contract.filters.Transfer();
      console.log('Filter ========>', filter);
      console.table({ INSIDE: true, fromBlock, toBlock, batch: toBlock - fromBlock });
      const logs = await web3.r_contract.queryFilter(filter, 43517880, 43517896);
      // const logs = await contract.r_contract.queryFilter(filter, fromBlock, toBlock);
      console.log('logs===============>>>>', logs);

      // update project status
      // transactionevent.emit('usdtdeposit', logs);
      //transactionevent.emit('updateblock', toBlock);

      // Update 'fromBlock' and 'toBlock' for the next batch
      fromBlock = toBlock + 1;
      toBlock = fromBlock + config.BATCH_SIZE;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

const schedulerForProjectStatus = cron.schedule('*/4 * * * * *', queryBlockFoRProjectStatus, {
  scheduled: false,
  timezone: 'Asia/Kolkata',
});

export { schedulerForProjectStatus as USDTDEPOSIT };
