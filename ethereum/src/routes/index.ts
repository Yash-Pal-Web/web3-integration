import { Router } from 'express';
import UserRoute from '../components/user/userRoute';
import WalletRoute from '../components/wallet/walletRoute';
import TransactionRoute from '../components/transaction/transctionRoute';
import Web3WalletRoute from '../components/web3Wallet/walletRoute';

const route = Router();

route.use('/user', UserRoute);
route.use('/wallet', WalletRoute);
route.use('/transaction', TransactionRoute);

// use route for web3js
route.use('/web3-wallet', Web3WalletRoute);

export default route;
