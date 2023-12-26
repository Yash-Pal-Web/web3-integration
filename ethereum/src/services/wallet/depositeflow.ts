// //import { CentralDeposit } from '../../component/transaction/centraldeposit';

// import { TRANSACTIONSTATUS } from '../../constant/enum';

// import { IWallet, centralwalletaddress } from '../../types/index';

// import eth from '../web3/eth';
// import EventEmitter from 'events';
// class EthWallet implements IWallet {
//   centralWalletAddress: Partial<Record<centralwalletaddress, string>>;
//   public event!: EventEmitter;
//   constructor(centralWalletAddress: string) {
//     this.centralWalletAddress = {
//       ethwalletaddress: centralWalletAddress,
//       bnbwalletaddress: centralWalletAddress,
//       usdtwalletaddress: centralWalletAddress,
//     };
//     this.event = new EventEmitter();
//   }
//   transferETH(from: string, amount: string, privateKey: string): Promise<void> {
//     throw new Error('Method not implemented.');
//   }

//   // async transferETHToCentralWallet(to: string, amount: string, privateKey: string, hash?: string): Promise<void> {
//   //   try {
//   //     const result = await eth.transferEth(
//   //       this.centralWalletAddress.ethwalletaddress as string,
//   //       amount,
//   //       privateKey,
//   //       to,
//   //     );
//   //     if (result) {
//   //       // update eth transfer status to completed
//   //       this.event.emit('update_failed_to_completed', { hash });
//   //     } else {
//   //       // send failed notifictaion
//   //       this.event.emit('failed_notification', hash, 'Something went wrong.please check', 'ETH');
//   //     }
//   //   } catch (error) {
//   //     this.event.emit('failed_notification', hash, error, 'ETH');
//   //   }
//   // }
// }

// const centralservices = new EthWallet(process.env.CENTRAL_WALLET as string);

// export default centralservices;
