import { ethers, parseEther } from 'ethers';
import config from '../../config/env';
//import database from '../../init/databaseConnection';

import tokenAbi from './tokenABI';
//import { contract } from 'web3/lib/commonjs/eth.exports';

class ETHHelper {
  //public event: EventEmitter;
  // private rpcurl: string;
  // constructor(url: string) {
  //   this.rpcurl = url;
  // }

  async createETHWallet() {
    try {
      const wallet = ethers.Wallet.createRandom();
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

  // Transfer function
  ethTransfer = async (to: any, from: any, decrypted_private_key: any, amounts: any) => {
    // Your Ethereum provider URL

    const providerUrl = config.eth.RPC_URL;

    //  wallet private key
    const privateKey = decrypted_private_key;

    // Recipient address
    const toAddress = to;

    // Amount of ETH to transfer (in Wei)
    const amount = parseEther(amounts); // Change the value accordingly

    // Connect to Ethereum network
    const provider = new ethers.JsonRpcProvider(providerUrl);

    // Create a wallet instance using your private key
    const wallet = new ethers.Wallet(privateKey, provider);

    // Perform the transfer

    const tx = await wallet.sendTransaction({
      to: toAddress,
      value: amount,
    });

    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be confirmed
    await tx.wait();

    console.log('Transfer complete!');

    return tx.hash;
  };

  // Token Transfer

  maticTokenTransfer = async (to: string, amounts: string) => {
    const providerUrl = config.matic.RPC_URL;

    const toAddress = to;
    const amount = parseEther(amounts); // Ensure amounts are properly converted to Wei

    const tokenAddress = config.TOKEN_ABI_CONTRACT_ADDRESS;
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(config.matic.PRIVATE_KEY as string, provider);

    // Ensure that tokenAbi is an array of ABI objects
    const tokenContract = new ethers.Contract(tokenAddress as string, tokenAbi, wallet);

    try {
      const tx = await tokenContract.transfer(toAddress, amount);
      console.log('Transaction hash:', tx.hash);
      await tx.wait();
      console.log('Transfer completed');
      return tx.hash;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  };

  // calculate gass fee for eth
  calculateGasFee = async (to: any, from: any, decrypted_private_key: any, amounts: any) => {
    const providerUrl = config.eth.RPC_URL;
    // Connect to Ethereum network
    const provider = new ethers.JsonRpcProvider(providerUrl);

    const privateKey = decrypted_private_key;
    const wallet = new ethers.Wallet(privateKey, provider);

    const fromAddress = from;
    const toAddress = to;
    // Amount of ETH to transfer (in Wei)
    const amount = parseEther(amounts);

    // Estimate gas cost
    const gasEstimate = await wallet.estimateGas({
      to: toAddress,
      value: amount,
    });

    console.log('gasEstimate+++++++++++++++++>', gasEstimate);
    return gasEstimate;
  };
}

const ethHelper = new ETHHelper();

export default ethHelper;
