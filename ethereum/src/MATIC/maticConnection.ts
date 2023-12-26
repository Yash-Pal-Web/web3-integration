import { Contract, Provider, ethers } from 'ethers';
import contractABI from './contractABI';
import config from '../config/env';

class EtherJS {
  public providers: Provider;
  public r_contract: Contract;

  constructor() {
    this.providers = new ethers.JsonRpcProvider(config.MATIC_RPC_URL);
    this.r_contract = new ethers.Contract(config.TOKEN_ABI_CONTRACT_ADDRESS as string, contractABI, this.providers);
  }
}

export default new EtherJS();
