import Web3 from 'web3';
import config from '../../config/env';
import EventEmitter from 'events';
import { ethers } from 'ethers';
import web3 from '../../ETH/web3';

class EthHelper {
  public event: EventEmitter;
  constructor() {
    this.event = new EventEmitter();
  }

  async createETHWallet() {
    try {
      const wallet = ethers.Wallet.createRandom();
      //console.log('wallet=========555>>>', wallet);
      return {
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        mnemonic: wallet.mnemonic?.phrase,
        publicAddress: wallet.address,
      };
    } catch (error) {
      console.log('error from wallet--->', error);
      throw error;
    }
  }

  web3Instance = async () => {
    const nodeUrl = config.NODE_URL_ETH;
    const provider = new Web3.providers.HttpProvider(nodeUrl);
    const web3 = new Web3(provider);
    return web3;
  };

  //convert in towei
  etherToWei = async (amount: any) => {
    const web3 = await this.web3Instance();
    const amountWei = web3.utils.toWei(amount.toString(), 'ether');
    return amountWei;
  };
  // convert fromWei
  weiToEther = async (amountInWei: any) => {
    const web3 = await this.web3Instance();
    const amountInEther = await web3.utils.fromWei(amountInWei.toString(), 'ether');
    return amountInEther;
  };

  // GAS PRICE

  getGasPrice = async () => {
    const web3 = await this.web3Instance();
    const getGasPrice = await web3.eth.getGasPrice();
    return getGasPrice;
  };
}
const ethHelper = new EthHelper();
export default ethHelper;
