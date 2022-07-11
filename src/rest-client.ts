import { AxiosRequestConfig } from 'axios';
import {
  GenericAPIResponse,
  getRestBaseUrl,
  RestClientOptions,
} from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import {
  AccountSummary,
  APIResponse,
  Balance,
  CancelAllOrdersReq,
  CancelNftAuctionReq,
  ChangeSubNameReq,
  DepositAddressReq,
  EditNftGallerySettingsReq,
  FillsReq,
  FundingPaymentsReq,
  FuturesCoin,
  FuturesPosition,
  ModifyClientIdOrderReq,
  ModifyOrderReq,
  ModifyTriggerOrderReq,
  NewLendingOfferReq,
  NewOrderReq,
  NewQuoteReq,
  NewSavedAddressReq,
  NewTriggerOrderReq,
  NftAuctionEditReq,
  NftAuctionReq,
  HistoricalIndexReq,
  HistoricalPricesReq,
  HistoricalPositionReq,
  NftBidReq,
  OpenTriggerOrdersReq,
  OrderbookReq,
  OrderHistoryReq,
  QuoteReq,
  RedeemNftReq,
  TimeRange,
  TimeRangeLimit,
  TradesReq,
  TransferBetweenSubReq,
  TriggerOrderHistoryReq,
  WithdrawalReq,
} from './types/rest';

export class RestClient {
  protected requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the inverse REST API client.
   *
params: HistoricalPositionReq   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
   */
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
  ) {
    this.requestWrapper = new RequestWrapper(
      key,
      secret,
      getRestBaseUrl(restClientOptions),
      restClientOptions,
      requestOptions
    );
    return this;
  }

  /**
   * Misc possible undocumented endpoints - these may not always work
   **/

  getRebateHistory() {
    return this.requestWrapper.get('referral_rebate_history');
  }

  getAnnouncements(language: string = 'en') {
    return this.requestWrapper.get(
      'notifications/get_announcements?language=' + language
    );
  }

  requestDust(toCoin: string): GenericAPIResponse {
    return this.requestWrapper.post(`dust/quotes`, { toCoin });
  }

  getDustStatus(quoteId: string): GenericAPIResponse {
    return this.requestWrapper.get(`dust/quotes/${quoteId}`);
  }

  acceptDust(quoteId: string): GenericAPIResponse {
    return this.requestWrapper.post(`dust/quotes/${quoteId}/accept`);
  }

  /**
   * Returns a list of historical USD balance snapshots taken every 4 hours.
   *
   * Note: undocumented
   * @param limit Number of days
   */
  getUsdValueSnapshots(limit: number = 10_000): GenericAPIResponse {
    return this.requestWrapper.get(`wallet/usd_value_snapshots`, { limit });
  }

  /**
   *
   * Subaccount Endpoints
   * https://docs.ftx.com/#subaccounts
   *
   **/

  getSubaccounts(): GenericAPIResponse {
    return this.requestWrapper.get('subaccounts');
  }

  createSubaccount(nickname: string): GenericAPIResponse {
    return this.requestWrapper.post('subaccounts', { nickname });
  }

  changeSubaccountName(params: ChangeSubNameReq): GenericAPIResponse {
    return this.requestWrapper.post('subaccounts/update_name', params);
  }

  deleteSubaccount(nickname: string): GenericAPIResponse {
    return this.requestWrapper.delete('subaccounts', { nickname });
  }

  getSubaccountBalances(nickname: string): GenericAPIResponse {
    return this.requestWrapper.get(`subaccounts/${nickname}/balances`);
  }

  transferBetweenSubaccounts(
    params: TransferBetweenSubReq
  ): GenericAPIResponse {
    return this.requestWrapper.post('subaccounts/transfer', params);
  }

  /**
   *
   * Market Endpoints
   * https://docs.ftx.com/#markets
   *
   **/

  getMarkets(): GenericAPIResponse {
    return this.requestWrapper.get('markets');
  }

  getMarket(marketName: string): GenericAPIResponse {
    return this.requestWrapper.get(`markets/${marketName}`);
  }

  getOrderbook(params: OrderbookReq): GenericAPIResponse {
    const suffix = params.depth ? `?depth=${params.depth}` : '';
    return this.requestWrapper.get(
      `markets/${params.marketName}/orderbook${suffix}`
    );
  }

  getTrades(params: TradesReq): GenericAPIResponse {
    return this.requestWrapper.get(
      `markets/${params.market_name}/trades`,
      params
    );
  }

  getHistoricalPrices(params: HistoricalPricesReq): GenericAPIResponse {
    return this.requestWrapper.get(
      `markets/${params.market_name}/candles`,
      params
    );
  }

  /**
   *
   * Futures Endpoints
   * https://docs.ftx.com/#futures
   *
   **/

  listAllFutures(): Promise<APIResponse<FuturesCoin[]>> {
    return this.requestWrapper.get('futures');
  }

  getFuture(futureName: string): GenericAPIResponse {
    return this.requestWrapper.get(`futures/${futureName}`);
  }

  getFutureStats(futureName: string): GenericAPIResponse {
    return this.requestWrapper.get(`futures/${futureName}/stats`);
  }

  getFundingRates(params?: {
    future?: string;
    start_time?: number;
    end_time?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('funding_rates', params);
  }

  getIndexWeights(futuresIndexName: string): GenericAPIResponse {
    return this.requestWrapper.get(`indexes/${futuresIndexName}/weights`);
  }

  getExpiredFutures(): GenericAPIResponse {
    return this.requestWrapper.get('expired_futures');
  }

  getHistoricalIndex(params: HistoricalIndexReq): GenericAPIResponse {
    return this.requestWrapper.get(
      `indexes/${params.marketName}/candles`,
      params
    );
  }

  /**
   *
   * Account Endpoints
   * https://docs.ftx.com/#account
   *
   **/

  getAccount(): Promise<APIResponse<AccountSummary>> {
    return this.requestWrapper.get('account');
  }

  getPositions(
    showAveragePrice?: boolean
  ): Promise<APIResponse<FuturesPosition[]>> {
    const suffix =
      showAveragePrice !== undefined ? `?showAvgPrice=${showAveragePrice}` : '';
    return this.requestWrapper.get(`positions${suffix}`);
  }

  setAccountLeverage(leverage: number): GenericAPIResponse {
    return this.requestWrapper.post('account/leverage', { leverage });
  }

  getAllHistoricalBalances(): GenericAPIResponse {
    return this.requestWrapper.get('historical_balances/requests');
  }

  getHistoricalBalancesSnapshot(
    params: HistoricalPositionReq
  ): GenericAPIResponse {
    return this.requestWrapper.post('historical_balances/requests', params);
  }

  getHistoricalBalancesOf(id: number): GenericAPIResponse {
    return this.requestWrapper.get(`historical_balances/requests/${id}`);
  }
  /**
   *
   * Wallet Endpoints
   * https://docs.ftx.com/#wallet
   *
   **/

  getCoins(): GenericAPIResponse {
    return this.requestWrapper.get('wallet/coins');
  }

  getBalances(): Promise<APIResponse<Balance[]>> {
    return this.requestWrapper.get('wallet/balances');
  }

  getBalancesAllAccounts(): GenericAPIResponse {
    return this.requestWrapper.get('wallet/all_balances');
  }

  getDepositAddress(params: DepositAddressReq): GenericAPIResponse {
    const suffix = params.method ? `?method=${params.method}` : '';
    return this.requestWrapper.get(
      `wallet/deposit_address/${params.coin}${suffix}`
    );
  }

  getDepositHistory(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get('wallet/deposits', params);
  }

  getWithdrawalHistory(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get('wallet/withdrawals', params);
  }

  requestWithdrawal(params: WithdrawalReq): GenericAPIResponse {
    return this.requestWrapper.post('wallet/withdrawals', params);
  }

  getAirdrops(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get('wallet/airdrops', params);
  }

  getSavedAddresses(coin?: string): GenericAPIResponse {
    return this.requestWrapper.get('wallet/saved_addresses', { coin });
  }

  createSavedAddress(params: NewSavedAddressReq): GenericAPIResponse {
    return this.requestWrapper.post('wallet/saved_addresses', params);
  }

  deleteSavedAddress(savedAddressId: number): GenericAPIResponse {
    return this.requestWrapper.delete(
      `wallet/saved_addresses/${savedAddressId}`
    );
  }

  /**
   *
   * Order Endpoints
   * https://docs.ftx.com/#wallet
   *
   **/

  getOpenOrders(market?: string): GenericAPIResponse {
    const suffix = market ? `?market=${market}` : '';
    return this.requestWrapper.get(`orders${suffix}`);
  }

  getOrderHistory(params?: OrderHistoryReq): GenericAPIResponse {
    return this.requestWrapper.get(`orders/history`, params);
  }

  getOpenTriggerOrders(params?: OpenTriggerOrdersReq): GenericAPIResponse {
    return this.requestWrapper.get(`conditional_orders`, params);
  }

  getTriggerOrderTriggers(conditionalOrderId: string): GenericAPIResponse {
    return this.requestWrapper.get(
      `conditional_orders/${conditionalOrderId}/triggers`
    );
  }

  getTriggerOrderHistory(params?: TriggerOrderHistoryReq): GenericAPIResponse {
    return this.requestWrapper.get(`conditional_orders/history`, params);
  }

  placeOrder(params: NewOrderReq): GenericAPIResponse {
    return this.requestWrapper.post('orders', params);
  }

  placeTriggerOrder(params: NewTriggerOrderReq): GenericAPIResponse {
    return this.requestWrapper.post('conditional_orders', params);
  }

  modifyOrder(params: ModifyOrderReq): GenericAPIResponse {
    return this.requestWrapper.post(`orders/${params.orderId}/modify`, {
      size: params.size,
      price: params.price,
      clientId: params.clientId,
    });
  }

  modifyOrderByClientId(
    clientOrderId: string,
    params: ModifyClientIdOrderReq
  ): GenericAPIResponse {
    return this.requestWrapper.post(
      `orders/by_client_id/${clientOrderId}/modify`,
      params
    );
  }

  modifyTriggerOrder(
    orderId: string,
    params: ModifyTriggerOrderReq
  ): GenericAPIResponse {
    return this.requestWrapper.post(
      `conditional_orders/${orderId}/modify`,
      params
    );
  }

  getOrderStatus(orderId: string): GenericAPIResponse {
    return this.requestWrapper.get(`orders/${orderId}`);
  }

  getOrderStatusByClientId(clientOrderId: string): GenericAPIResponse {
    return this.requestWrapper.get(`orders/by_client_id/${clientOrderId}`);
  }

  cancelOrder(orderId: string): GenericAPIResponse {
    return this.requestWrapper.delete(`orders/${orderId}`);
  }

  cancelOrderByClientId(clientOrderId: string): GenericAPIResponse {
    return this.requestWrapper.delete(`orders/by_client_id/${clientOrderId}`);
  }

  cancelOpenTriggerOrder(conditionalOrderId: string): GenericAPIResponse {
    return this.requestWrapper.delete(
      `conditional_orders/${conditionalOrderId}`
    );
  }

  cancelAllOrders(params?: CancelAllOrdersReq): GenericAPIResponse {
    return this.requestWrapper.delete('orders', params);
  }

  /**
   *
   * Convert Endpoints
   * https://docs.ftx.com/#convert
   *
   **/

  requestQuote(params: QuoteReq): GenericAPIResponse {
    return this.requestWrapper.post(`otc/quotes`, params);
  }

  getQuoteStatus(quoteId: string, market?: string): GenericAPIResponse {
    const suffix = market ? `?market=${market}` : '';
    return this.requestWrapper.get(`otc/quotes/${quoteId}${suffix}`);
  }

  acceptQuote(quoteId: string): GenericAPIResponse {
    return this.requestWrapper.post(`otc/quotes/${quoteId}/accept`);
  }

  /**
   *
   * Spot Margin Endpoints
   * https://docs.ftx.com/#spot-margin
   *
   **/

  getBorrowRates(): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/borrow_rates`);
  }

  getLendingRates(): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/lending_rates`);
  }

  getDailyBorrowedAmounts(): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/borrow_summary`);
  }

  getMarketInfo(market?: string): GenericAPIResponse {
    const suffix = market ? `?market=${market}` : '';
    return this.requestWrapper.get(`spot_margin/market_info${suffix}`);
  }

  getBorrowHistory(params?: Partial<TimeRange>): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/borrow_history`, params);
  }

  getLendingHistory(): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/lending_history`);
  }

  getLendingOffers(): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/offers`);
  }

  getLendingInfo(): GenericAPIResponse {
    return this.requestWrapper.get(`spot_margin/lending_info`);
  }

  submitLendingOffer(params: NewLendingOfferReq): GenericAPIResponse {
    return this.requestWrapper.post(`spot_margin/offers`, params);
  }

  /**
   *
   * Misc Endpoints (fills, & funding)
   * https://docs.ftx.com/#fills
   *
   **/

  getFills(params: FillsReq): GenericAPIResponse {
    return this.requestWrapper.get(`fills`, params);
  }

  getFundingPayments(params?: FundingPaymentsReq): GenericAPIResponse {
    return this.requestWrapper.get(`funding_payments`, params);
  }

  /**
   *
   * Leveraged Tokens Endpoints
   * https://docs.ftx.com/#leveraged-tokens
   *
   **/

  listLeveragedTokens(): GenericAPIResponse {
    return this.requestWrapper.get(`lt/tokens`);
  }

  getLeveragedTokenInfo(tokenName: string): GenericAPIResponse {
    return this.requestWrapper.get(`lt/${tokenName}`);
  }

  getLeveragedTokenBalances(): GenericAPIResponse {
    return this.requestWrapper.get(`lt/balances`);
  }

  listLeveragedTokenCreationRequests(): GenericAPIResponse {
    return this.requestWrapper.get(`lt/creations`);
  }

  requestLeveragedTokenCreation(
    tokenName: string,
    size: number
  ): GenericAPIResponse {
    return this.requestWrapper.post(`lt/${tokenName}`, { size });
  }

  listLeveragedTokenRedemptionRequests(): GenericAPIResponse {
    return this.requestWrapper.get(`lt/redemptions`);
  }

  requestLeveragedTokenRedemption(
    tokenName: string,
    size: number
  ): GenericAPIResponse {
    return this.requestWrapper.post(`lt/${tokenName}/redeem`, { size });
  }

  /**
   *
   * Options Endpoints
   * https://docs.ftx.com/#options
   *
   **/

  listQuoteRequests(): GenericAPIResponse {
    return this.requestWrapper.get(`options/requests`);
  }

  getMyQuoteRequests(): GenericAPIResponse {
    return this.requestWrapper.get(`options/my_requests`);
  }

  createQuoteRequest(params: NewQuoteReq): GenericAPIResponse {
    return this.requestWrapper.post(`options/requests`, params);
  }

  cancelQuoteRequest(quoteRequestId: string): GenericAPIResponse {
    return this.requestWrapper.delete(`options/requests/${quoteRequestId}`);
  }

  getQuotesForQuoteRequest(quoteRequestId: string): GenericAPIResponse {
    return this.requestWrapper.get(`options/requests/${quoteRequestId}/quotes`);
  }

  createQuote(quoteRequestId: string, price: number): GenericAPIResponse {
    return this.requestWrapper.post(`options/requests/${quoteRequestId}`, {
      price,
    });
  }

  getMyQuotes(): GenericAPIResponse {
    return this.requestWrapper.get(`options/my_quotes`);
  }

  cancelQuote(quoteId: string): GenericAPIResponse {
    return this.requestWrapper.delete(`options/quotes/${quoteId}`);
  }

  acceptOptionsQuote(quoteId: string): GenericAPIResponse {
    return this.requestWrapper.post(`options/quotes/${quoteId}/accept`);
  }

  getOptionsAccountInfo(): GenericAPIResponse {
    return this.requestWrapper.get(`options/account_info`);
  }

  getOptionsPositions(): GenericAPIResponse {
    return this.requestWrapper.get(`options/positions`);
  }

  getPublicOptionsTrades(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get(`options/trades`, params);
  }

  getOptionsFills(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get(`options/fills`, params);
  }

  get24hOptionVolume(): GenericAPIResponse {
    return this.requestWrapper.get(`options/24h_options_volume`);
  }

  getOptionsHistoricalVolumes(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get(`options/historical_volumes/BTC`, params);
  }

  getOptionsOpenInterest(): GenericAPIResponse {
    return this.requestWrapper.get(`options/open_interest/BTC`);
  }

  getOptionsHistoricalOpenInterest(
    params?: TimeRangeLimit
  ): GenericAPIResponse {
    return this.requestWrapper.get(
      `options/historical_open_interest/BTC`,
      params
    );
  }

  /**
   *
   * SRM Staking Endpoints
   * https://docs.ftx.com/#srm-staking
   *
   **/

  getStakes(): GenericAPIResponse {
    return this.requestWrapper.get(`staking/stakes`);
  }

  getUnstakeRequests(): GenericAPIResponse {
    return this.requestWrapper.get(`staking/unstake_requests`);
  }

  getStakeBalances(): GenericAPIResponse {
    return this.requestWrapper.get(`staking/balances`);
  }

  createUnstakeRequest(coin: string, size: number): GenericAPIResponse {
    return this.requestWrapper.post(`staking/unstake_requests`, { coin, size });
  }

  cancelUnstakeRequest(unstakeRequestId: string): GenericAPIResponse {
    return this.requestWrapper.delete(
      `staking/unstake_requests/${unstakeRequestId}`
    );
  }

  getStakingRewards(): GenericAPIResponse {
    return this.requestWrapper.get(`staking/staking_rewards`);
  }

  createStakeRequest(coin: string, size: number): GenericAPIResponse {
    return this.requestWrapper.post(`staking/stakes`, { coin, size });
  }

  getServerTime(): GenericAPIResponse {
    return this.requestWrapper.get('https://otc.ftx.com/api/time');
  }

  getApiKeyInfo(): GenericAPIResponse {
    return this.requestWrapper.get('api_key_status');
  }

  /**
   *
   * NFT Endpoints
   * https://docs.ftx.com/#nfts
   *
   **/
  listNfts(): GenericAPIResponse {
    return this.requestWrapper.get('nft');
  }

  getNftInfo(nftId: number): GenericAPIResponse {
    return this.requestWrapper.get(`nft/${nftId}`);
  }

  getNftTrades(nftId: number, params?: TimeRange): GenericAPIResponse {
    return this.requestWrapper.get(`nft/${nftId}/trades`, params);
  }

  getAllNftTrades(params?: TimeRangeLimit): GenericAPIResponse {
    return this.requestWrapper.get('nft/all_trades', params);
  }

  getNftAccountInfo(nftId: number): GenericAPIResponse {
    return this.requestWrapper.get(`/nft/${nftId}/account_info`);
  }

  getNftCollections(): GenericAPIResponse {
    return this.requestWrapper.get('nft/collections');
  }

  getNftBalances(): GenericAPIResponse {
    return this.requestWrapper.get('nft/balances');
  }

  makeNftOffer(params: NftBidReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/offer', params);
  }

  buyNft(params: NftBidReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/buy', params);
  }

  createNftAuction(params: NftAuctionReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/auction', params);
  }

  editNftAuction(params: NftAuctionEditReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/edit_auction', params);
  }

  cancelNftAuction(params: CancelNftAuctionReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/cancel_auction', params);
  }

  placeNftBid(params: NftBidReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/bids', params);
  }

  getNftDeposits(params: Required<TimeRange>): GenericAPIResponse {
    return this.requestWrapper.get('nft/deposits', params);
  }

  getNftWithdrawls(params: Required<TimeRange>): GenericAPIResponse {
    return this.requestWrapper.get('nft/withdrawls', params);
  }

  getNftFills(params: Required<TimeRange>): GenericAPIResponse {
    return this.requestWrapper.get('nft/fills', params);
  }

  redeemNft(params: RedeemNftReq): GenericAPIResponse {
    return this.requestWrapper.post('nft/redeem', params);
  }

  getNftGallery(gallery_id: number): GenericAPIResponse {
    return this.requestWrapper.get(`nft/gallery/${gallery_id}`);
  }

  getNftGallerySettings(): GenericAPIResponse {
    return this.requestWrapper.get('nft/gallery_settings');
  }

  editNftGallerySettings(
    params: EditNftGallerySettingsReq
  ): GenericAPIResponse {
    return this.requestWrapper.post('nft/gallery_settings', params);
  }

  /**
   * @deprecated move this somewhere else, because endpoints shouldn't be hardcoded here
   */
  async getTimeOffset(): Promise<number> {
    const start = Date.now();
    try {
      const response = await this.getServerTime();
      const result = new Date(response.result).getTime();
      const end = Date.now();

      return Math.ceil(result - end + (end - start) / 2);
    } catch (e) {
      return 0;
    }
  }
}
