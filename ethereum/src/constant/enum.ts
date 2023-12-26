export enum SALETYPES {
  PRESALE = 'Presale',
  RETAILERSALE = 'Retailsale',
}
export enum ORDERTYPE {
  BUY = 'Buy',
  SELL = 'Sell',
}

export enum ACCOUNTTYPE {
  RETAILER = 'Retailer',
  INSTITUTIONAL = 'Institution',
}
export enum PROJECTSTATUS {
  REJECTED = 'Rejected',
  REQUESTED = 'Requested',
  CREATED = 'Created',
  LIVE = 'Live',
  UPCOMING = 'Upcoming',
  SOLD = 'Sold',
}

export enum ADMINSTATUS {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
}

export enum CREATOR {
  USER = 'User',
  ADMIN = 'Admin',
}

export enum FEESTATUS {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}
export enum AUTHEVENT {
  WALLET_CREATION = 'wallet_creation',
}
export enum ORDERSTATUS {
  CREATED = 'Created',
  PENDING = 'Pending',
  FAILED = 'Failed',
  COMPLETED = 'Completed',
}

export enum PHASESTATUS {
  CREATED = 'Created',
  UPCOMING = 'Upcoming',
  LIVE = 'Live',
  COMPLETED = 'Completed',
}

export enum TRANSACTIONSTATUS {
  PROCESSING = 'Processing',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  REJECTED = 'Rejected',
  APPROVED = 'Approved',
}

export enum WITHDRAWALFLOW {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}
export enum NOTIFICATIONSTATUS {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}
export enum PAYMENTMODE {
  FIAT = 'Fiat',
  CRYPTO = 'crypto',
  BOTH = 'Both',
}

export enum TRANSACTIONTYPE {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw',
}

export enum EXCHANGELIST {
  USER_EXCHANGE = 'userExchange',
  AUTH_EXCHANGE = 'authExchange',
  TOKEN_EXCHANGE = 'tokenExchange',
  CRON_EXCHANGE = 'cronExchange',
  NOTIFICATION_EXCHANGE = 'notificationExchange',
}

export enum ROUTEKEY {
  PROCESS_BNB_QUEQE = 'process_bnb_deposit',
  USER_AUTH_KEY = 'userauth',
  ROUTE_LIST = 'routelist',
  ETH_DEPOSIT_QUEQE = 'eth_deposit_queqe',
  ETH_DEPOSIT = 'eth_deposit',
  BTC_DEPOSIT = 'btc_deposit_conformation',
  BTC_WITHDRAWAL = 'btc_withdrawal_conformation',
  BTC_WITHDRAWAL_SUCCESS = 'btc_withdrawal_success',
  BTC_DEPOSIT_SUCCESS = 'btc_deposit_success',
  LIVE_NOTIFICATION = 'live_notification',
  BNB_DEPOSIT_QUEQE = 'bnb_deposit_queqe',
  USDT_DEPOSIT_QUEQE = 'usdt_deposit_queqe',
  TOKEN_WITHDRAW = 'token_withdraw',
  PROCESS_INVESTMENT = 'process_investment',
  WALLET_CREATION = 'new_wallet_creation',
  ADD_WALLET = 'add_wallet',
  USDT_APPROVAL = 'usdt_approval',
  USDT_TRANSFER_TO_CENTRAL_WALLET = 'usdt_transfer_to_central_wallet',
}

export enum THREADTYPE {
  UPDATE_API_LIST = 'UPDATEAPILIST',
  UPDATE_AUTH_DETAILS = 'UPDATEAUTHOFUSER',
}
export enum EMAIL_TEMPLATE {
  EMAIL_VERIDICATION = 'common.ejs',
  FORGET_PASSWORD = 'forgot_password.ejs',
}

export enum EMAILTYPES {
  TWO_FACTOR_AUTHENTICATION = 'two_factor_authentication',
  EMAIL_VERIDICATION = 'email_verification',
  FORGOT_PASSWORD = 'forgot_password',
  RESENT_OTP = 'resend_otp',
  RESET_PASSWORD_SUCCESSFUL = 'reset_successful',
  SEND_LIVE_NOTIFICATION = 'send_live_notification',
  //SEND_BNB_COIN = 'IBAX:send_BNB_coin_block_synck',
  //SEND_ETH_COIN = 'IBAX:send_ETH_coin_block_sync',
  BLOCKS_SYNC_STATUS = 'IBAX:Blocks Sync Status ',
}

export enum COINFAMILY {
  ETH = 'ETH',
  BTC = 'BTC',
  BSC = 'BSC',
}

export enum COINSYMBOL {
  ETH = 'ETH',
  BTC = 'BTC',
  USDT = 'USDT',
  BNB = 'BNB',
}

export enum REWARDTYPE {
  USDT = 'usdt',
  TOKEN = 'token',
}

export enum USDTTRANSACTION {
  TRANSFER = 'Transfer',
  APPROVAL = 'Approval',
  TRANSFERFROM = 'TRANSFERFROM',
}

export enum KYCSTATUS {
  STARTED = 'Started',
  PENDING = 'Pending',
  NOTSTARTED = 'Not Started',
  APPROVED = 'Approved',
  RESUBMIT = 'ReSubmit',
  REJECTED = 'Rejected',
}

export enum CLICKTYPE {
  INVESTMENT = 'Investment',
  TRANSAK = 'Transak',
}

export enum TOKENTYPE {
  ETH = 'ETH',
  USDT = 'USDT',

  BNB = 'BNB',
}

// swagger

export interface SwaggerSpec {
  // Define the structure of your Swagger specification here
  // For example:
  swagger: string;
  info: {
    version: string;
    title: string;
    // Add other properties according to your Swagger specification
  };
  // Add other sections of the Swagger specification as needed
}
