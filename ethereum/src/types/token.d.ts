import { TRANSACTIONSTATUS } from '../constant/enum';

export interface TokenService {
  createProject: (state: string) => object;
}

interface TokenInterface {
  tokenWithdrawal(transactionId: string): Promise<void>;
}

type centralwalletaddress = 'ethwalletaddress' | 'bnbwalletaddress' | 'usdtwalletaddress';

export interface IWallet {
  centralWalletAddress: Partial<Record<centralwalletaddress, string>>;
  transferETH(from: string, amount: string, privateKey: string): Promise<void>;
}

type IDeviceInfo = {
  deviceId: string;
  token: string;
};

type NOTIFICATIONOBJECT = {
  email: string;
  amount: number;
  name: string;
  symbol?: string;
  trxId: string;
  to: string;
  status: TRANSACTIONSTATUS;
  amount: number;
  date: string | Date;
};
