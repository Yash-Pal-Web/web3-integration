import { Request, Response, NextFunction } from 'express';
import { IUserBody, IUserController, IUserService, IWalletBody } from '../../types/user';
import { ILogger } from '../../types/logger';
import logger from '../../utils/logger';
import { successResponse } from '../../utils/response';
import { USER_MESSAGE } from '../../constant';
import transactionService from './transactionService';
import { Transaction } from 'ethers';
import { BadRequest } from '../../error';
import eth from '../../services/EtherJs/eth';

class TransactionController {
  async withdrawalAmount(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.body.walletId;
      const txHashId = req.body.txHashId;
      const balance = req.body.balance;
      const to = req.body.to;
      const from = req.body.from;
      if (!walletId) throw new BadRequest('WalletId is required');
      if (!to) throw new BadRequest('Address is require.');
      if (!balance) throw new BadRequest('Amount is required .');
      if (!txHashId) throw new BadRequest('txHashId id is required');
      const data = await transactionService.ethWithdrawal(
        { to, from, balance: parseFloat(balance) },
        txHashId,
        walletId,
      );
      return successResponse(res, { data }, 'Withdrawal request sent successfully');
    } catch (error: unknown) {
      next(error);
    }
  }
  // async ethTransafer(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const toAddress = req.body.to;
  //     const fromAddress = req.body.from;
  //     const amount = req.body.amounts;
  //     if (!toAddress) throw new BadRequest('To Address not fount');
  //     if (!fromAddress) throw new BadRequest('From request not found');
  //     const data = await eth.ethTransfer(toAddress, fromAddress, amount);
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // }
}

export default new TransactionController();
