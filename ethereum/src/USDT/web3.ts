import { Contract, ethers, Provider } from 'ethers';
import contractABI from './contractABI';
import config from '../config/env';

class Web3 {
  public providers: Provider;
  // eslint-disable-next-line camelcase
  public r_contract: Contract;
  // eslint-disable-next-line camelcase

  constructor() {
    this.providers = new ethers.JsonRpcProvider(config.usdt.RPC_URL);
    // eslint-disable-next-line camelcase
    this.r_contract = new ethers.Contract(config.usdt.USDT_CONTRACT_ADDRESS as string, contractABI, this.providers);
  }
}

export default new Web3();
