import schedulerForBalanceStatus from '../ETH/cronJob';
import { PROJECTBLOCKCRONPROCESS } from '../MATIC/cronJob';
import { USDTDEPOSIT } from '../USDT/cronJob';

async function startCronServices() {
  //PROJECTBLOCKCRONPROCESS.start(); // for matic
  //schedulerForBalanceStatus.start();   // for eth native coin
  //USDTDEPOSIT.start();                   // for USDT currently not use
}

export default startCronServices;
