import { maticseedDataToDB } from '../MATIC/maticBlockHelper';
import { usdtSeedDataToDB } from '../USDT/blockHelper';

async function seedData() {
  await maticseedDataToDB();
  await usdtSeedDataToDB();
}

export default seedData;
