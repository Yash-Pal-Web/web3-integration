import { ethers, Provider, BigNumberish } from 'ethers';
import config from '../config/env';

class EtherWeb3 {
  public providers: Provider;
  constructor() {
    this.providers = new ethers.JsonRpcProvider(config.eth.RPC_URL);
  }
  // listen to event
}

export default new EtherWeb3();
