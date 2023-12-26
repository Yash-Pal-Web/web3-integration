import path from 'path';
import * as dotenv from 'dotenv';
const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

export default {
  dbconfig: {
    dbname: process.env.DB_NAME || '',
    dbhost: process.env.DB_HOST || '',
    dbpassword: process.env.DB_PASSWORD || '',
    dbuser: process.env.DB_USER || '',
    dbport: 3306,
  },
  PORT: process.env.PORT || 4000,
  SWAGGER_LINK: process.env.SWAGGER_LINK || 'http://localhost:4000/api-docs',
  SALT_FACTOR: 10,
  HOME_DOMAIN_URL: process.env.HOME_DOMAIL_URL || 'http://localhost:4000',
  API_URL: 'http://localhost:4000/api/v1',
  WEBSITE_NAME: process.env.WEBSITE_NAME || 'BOILERPLATE FOR NODE.JS USING TYPESCRIPT',
  corsConfig: {},
  helmetConfig: {},
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  ENCRYPTION_PASSWORD: process.env.ENCRYPTION_PASSWORD,
  BATCH_SIZE: 100,
  usdt: {
    USDT_CONTRACT_ADDRESS: process.env.USDT_CONTRACT_ADDRESS,
    batch: 20,
    lastBlock: 4882955,
    RPC_URL: process.env.USDT_RPC_URL,
  },

  eth: {
    ETH_CONTRACT_ADDRESS: process.env.ETH_CONTRACT_ADDRESS,
    batch: 20,
    lastBlock: 4800449,
    RPC_URL: process.env.ETH_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
  matic: {
    batch: 20,
    lastBlock: 43285667,
    RPC_URL: process.env.MATIC_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
  NODE_URL_ETH: process.env.NODE_URL_ETH || '',
  CHAIN_ID_ETH: process.env.CHAIN_ID_ETH || '',
  ETH_DEPOSIT_ADDRESS: process.env.ETH_DEPOSIT_ADDRESS || '',
  MATIC_RPC_URL: process.env.MATIC_RPC_URL,
  TOKEN_ABI_CONTRACT_ADDRESS: process.env.TOKEN_ABI_CONTRACT_ADDRESS,
};
