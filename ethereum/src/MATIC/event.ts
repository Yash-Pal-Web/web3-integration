import event from 'events';
enum TransactionEvent {
  'UPDATETRANSACTION' = 'UPDATETRANSACTION',
}

import { MaticLastBlock } from './maticLastBlock';
import { InternalError } from '../error/index';

import walletService from '../components/wallet/walletService';
import { hash } from 'bcrypt';
import { formatUnits } from 'ethers';
import { Wallet } from '../components/wallet/walletModel';
import { Transaction } from '../components/transaction/transaction';

//import tokenServices from '../services/tokenServices';
class UpdateTransaction extends event {
  public events = TransactionEvent;
}

const transactionevent = new UpdateTransaction();

transactionevent.on('updateProjectStatus', async (data) => {
  try {
    for (const transaction of data) {
      const newWalletTransaction = new Transaction();
      newWalletTransaction.from = transaction.args[0];
      newWalletTransaction.to = transaction.args[1];
      newWalletTransaction.txHashId = transaction.transactionHash;
      newWalletTransaction.balance = parseFloat(transaction.args[2]);

      // Save the transactionInfo to the database
      await newWalletTransaction.save();
    }
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
});

// find wallet address

transactionevent.on('updateblock', async (blocknumber: number) => {
  const lastblock = await MaticLastBlock.findOne({
    where: {
      isActive: true,
    },
  });
  if (!lastblock) throw new InternalError('last block not fetched', true);
  lastblock.lastBlock = blocknumber + 1;
  await lastblock.save();
});

export default transactionevent;
