import { RestClient } from '../src/rest-client';

/*

  Demonstrations on basic REST API calls

*/

(async () => {
  // Optional, but required for private endpoints
  const key = 'vN0h2BlDFk2EBaHxglTtXtD4EB9_NRQYx0mVlPFU';
  const secret = 'ILNvroZ6SUDuvTg9mzc2-u-JnTTX9S1wMjDLwaES';

  const client = new RestClient(key, secret);

  try {
    const balances = await client.getHistoricalBalancesSnapshot({
      accounts: ['Futs1'],
      endTime: 1646376865,
    });

    console.log(balances);

    const snap = await client.getHistoricalBalancesOf(balances.result);

    console.log(snap);

    const all = await client.getAllHistoricalBalances();
  } catch (e) {
    console.error('public get method failed: ', e);
  }

  process.exit();
})();
