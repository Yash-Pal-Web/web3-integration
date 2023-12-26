import { Request, Response, NextFunction } from 'express';

import { successResponse } from '../../utils/response';
import { USER_MESSAGE } from '../../constant';
import walletService from './walletService';
import { BadRequest } from '../../error';

class WalletController {
  async createWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.userId;
      const tokenType = req.body.TokenType;
      if (!userId) throw new BadRequest('user id is required');
      if (!tokenType) throw new BadRequest('token type is required');

      const result = await walletService.createWallet(userId, tokenType);

      return successResponse(res, { ...result }, USER_MESSAGE.USER_CREATED);
    } catch (error: unknown) {
      next(error);
    }
  }
  //   async transferEthBalance(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { to, amounts, walletId } = req.body;

  //       if (!to) throw new BadRequest('To address is required');
  //       if (!amounts) throw new BadRequest('Amounts is required');
  //       if (!walletId) throw new BadRequest('wallet id is required');
  //       const result = await walletService.transferEthBalance(to, walletId, amounts);
  //       //console.log('result==', result);
  //       return successResponse(res, { result }, 'success');
  //     } catch (error: unknown) {
  //       next(error);
  //     }
  //   }
}

export default new WalletController();
