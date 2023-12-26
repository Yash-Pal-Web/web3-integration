import { Contract, ethers, BigNumberish, Signer, parseUnits, Provider } from 'ethers';
import contractABI from './contractABI';
import config from '../../config/env';
import { any } from 'joi';

class TokenHelper {
  public providers: Provider;
  public r_contract: Contract;

  // constructor() {
  //   this.providers = new ethers.providers.JsonRpcProvider(config.MATIC_RPC_URL);
  //   this.r_contract = new ethers.Contract(config.TOKEN_ABI_CONTRACT_ADDRESS, contractABI, this.providers);

  //   this.adminwallet = new ethers.Wallet(process.env.ADMIN_WALLET_PRIVATE_KEY as string, this.providers);
  //   this.rw_contract = new ethers.Contract(config.ABI_CONTRACT_ADDRESS, contractABI, this.adminwallet);
  // }

  constructor() {
    this.providers = new ethers.JsonRpcProvider(config.MATIC_RPC_URL);
    this.r_contract = new ethers.Contract(config.TOKEN_ABI_CONTRACT_ADDRESS as string, contractABI, this.providers);
  }

  async getAmountToTransfer(amount: number) {
    // cache decimal
    const decimal = await this.r_contract.decimals();
    const decimalint = parseInt(decimal);
    const amountTotransfer = parseUnits(amount.toString(), decimalint);
    return amountTotransfer;
  }

  async transferINRTXToken(recepientaddress: any, amount: number): Promise<any> {
    // eslint-disable-next-line no-useless-catch
    try {
      // get decimal digit
      const decimal = await this.r_contract.decimals();
      const decimalint = parseInt(decimal);
      const amountTotransfer = amount * Math.pow(10, decimalint);
      console.log('amount to transfer', amountTotransfer);
      const tx = await this.r_contract.transfer(recepientaddress, amountTotransfer);
      return tx;
    } catch (error: any) {
      throw error;
    }
  }

  //   async estimateGasFee(){

  //     const recipient = 'SOME_ADDRESS_HERE';
  //     const estimation = await erc20.estimateGas.transfer(recipient, 100);
  //     const estimatedGasFee=await this.providers.estimateGas()
  //   }
}

// const tokenHelper = new TokenHelper(config.eth.RPC_URL, config.eth.ETH_CONTRACT_ADDRESS, config.eth.PRIVATE_KEY);
// export { tokenHelper };

export default new TokenHelper();
