import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, RestClientOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import { AccountSummary, APIResponse, Balance, CancelAllOrdersReq, CancelNftAuctionReq, ChangeSubNameReq, DepositAddressReq, EditNftGallerySettingsReq, FillsReq, FundingPaymentsReq, FuturesCoin, FuturesPosition, ModifyClientIdOrderReq, ModifyOrderReq, ModifyTriggerOrderReq, NewLendingOfferReq, NewOrderReq, NewQuoteReq, NewSavedAddressReq, NewTriggerOrderReq, NftAuctionEditReq, NftAuctionReq, HistoricalIndexReq, HistoricalPricesReq, HistoricalPositionReq, NftBidReq, OpenTriggerOrdersReq, OrderbookReq, OrderHistoryReq, QuoteReq, RedeemNftReq, TimeRange, TimeRangeLimit, TradesReq, TransferBetweenSubReq, TriggerOrderHistoryReq, WithdrawalReq } from './types/rest';
export declare class RestClient {
    protected requestWrapper: RequestWrapper;
    /**
     * @public Creates an instance of the inverse REST API client.
     *
  params: HistoricalPositionReq   * @param {string} key - your API key
     * @param {string} secret - your API secret
     * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
     */
    constructor(key?: string | undefined, secret?: string | undefined, restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig);
    /**
     * Misc possible undocumented endpoints - these may not always work
     **/
    getRebateHistory(): GenericAPIResponse;
    getAnnouncements(language?: string): GenericAPIResponse;
    requestDust(toCoin: string): GenericAPIResponse;
    getDustStatus(quoteId: string): GenericAPIResponse;
    acceptDust(quoteId: string): GenericAPIResponse;
    /**
     * Returns a list of historical USD balance snapshots taken every 4 hours.
     *
     * Note: undocumented
     * @param limit Number of days
     */
    getUsdValueSnapshots(limit?: number): GenericAPIResponse;
    /**
     *
     * Subaccount Endpoints
     * https://docs.ftx.com/#subaccounts
     *
     **/
    getSubaccounts(): GenericAPIResponse;
    createSubaccount(nickname: string): GenericAPIResponse;
    changeSubaccountName(params: ChangeSubNameReq): GenericAPIResponse;
    deleteSubaccount(nickname: string): GenericAPIResponse;
    getSubaccountBalances(nickname: string): GenericAPIResponse;
    transferBetweenSubaccounts(params: TransferBetweenSubReq): GenericAPIResponse;
    /**
     *
     * Market Endpoints
     * https://docs.ftx.com/#markets
     *
     **/
    getMarkets(): GenericAPIResponse;
    getMarket(marketName: string): GenericAPIResponse;
    getOrderbook(params: OrderbookReq): GenericAPIResponse;
    getTrades(params: TradesReq): GenericAPIResponse;
    getHistoricalPrices(params: HistoricalPricesReq): GenericAPIResponse;
    /**
     *
     * Futures Endpoints
     * https://docs.ftx.com/#futures
     *
     **/
    listAllFutures(): Promise<APIResponse<FuturesCoin[]>>;
    getFuture(futureName: string): GenericAPIResponse;
    getFutureStats(futureName: string): GenericAPIResponse;
    getFundingRates(params?: {
        future?: string;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    getIndexWeights(futuresIndexName: string): GenericAPIResponse;
    getExpiredFutures(): GenericAPIResponse;
    getHistoricalIndex(params: HistoricalIndexReq): GenericAPIResponse;
    /**
     *
     * Account Endpoints
     * https://docs.ftx.com/#account
     *
     **/
    getAccount(): Promise<APIResponse<AccountSummary>>;
    getPositions(showAveragePrice?: boolean): Promise<APIResponse<FuturesPosition[]>>;
    setAccountLeverage(leverage: number): GenericAPIResponse;
    getAllHistoricalBalances(): GenericAPIResponse;
    getHistoricalBalancesSnapshot(params: HistoricalPositionReq): GenericAPIResponse;
    getHistoricalBalancesOf(id: number): GenericAPIResponse;
    /**
     *
     * Wallet Endpoints
     * https://docs.ftx.com/#wallet
     *
     **/
    getCoins(): GenericAPIResponse;
    getBalances(): Promise<APIResponse<Balance[]>>;
    getBalancesAllAccounts(): GenericAPIResponse;
    getDepositAddress(params: DepositAddressReq): GenericAPIResponse;
    getDepositHistory(params?: TimeRangeLimit): GenericAPIResponse;
    getWithdrawalHistory(params?: TimeRangeLimit): GenericAPIResponse;
    requestWithdrawal(params: WithdrawalReq): GenericAPIResponse;
    getAirdrops(params?: TimeRangeLimit): GenericAPIResponse;
    getSavedAddresses(coin?: string): GenericAPIResponse;
    createSavedAddress(params: NewSavedAddressReq): GenericAPIResponse;
    deleteSavedAddress(savedAddressId: number): GenericAPIResponse;
    /**
     *
     * Order Endpoints
     * https://docs.ftx.com/#wallet
     *
     **/
    getOpenOrders(market?: string): GenericAPIResponse;
    getOrderHistory(params?: OrderHistoryReq): GenericAPIResponse;
    getOpenTriggerOrders(params?: OpenTriggerOrdersReq): GenericAPIResponse;
    getTriggerOrderTriggers(conditionalOrderId: string): GenericAPIResponse;
    getTriggerOrderHistory(params?: TriggerOrderHistoryReq): GenericAPIResponse;
    placeOrder(params: NewOrderReq): GenericAPIResponse;
    placeTriggerOrder(params: NewTriggerOrderReq): GenericAPIResponse;
    modifyOrder(params: ModifyOrderReq): GenericAPIResponse;
    modifyOrderByClientId(clientOrderId: string, params: ModifyClientIdOrderReq): GenericAPIResponse;
    modifyTriggerOrder(orderId: string, params: ModifyTriggerOrderReq): GenericAPIResponse;
    getOrderStatus(orderId: string): GenericAPIResponse;
    getOrderStatusByClientId(clientOrderId: string): GenericAPIResponse;
    cancelOrder(orderId: string): GenericAPIResponse;
    cancelOrderByClientId(clientOrderId: string): GenericAPIResponse;
    cancelOpenTriggerOrder(conditionalOrderId: string): GenericAPIResponse;
    cancelAllOrders(params?: CancelAllOrdersReq): GenericAPIResponse;
    /**
     *
     * Convert Endpoints
     * https://docs.ftx.com/#convert
     *
     **/
    requestQuote(params: QuoteReq): GenericAPIResponse;
    getQuoteStatus(quoteId: string, market?: string): GenericAPIResponse;
    acceptQuote(quoteId: string): GenericAPIResponse;
    /**
     *
     * Spot Margin Endpoints
     * https://docs.ftx.com/#spot-margin
     *
     **/
    getBorrowRates(): GenericAPIResponse;
    getLendingRates(): GenericAPIResponse;
    getDailyBorrowedAmounts(): GenericAPIResponse;
    getMarketInfo(market?: string): GenericAPIResponse;
    getBorrowHistory(params?: Partial<TimeRange>): GenericAPIResponse;
    getLendingHistory(): GenericAPIResponse;
    getLendingOffers(): GenericAPIResponse;
    getLendingInfo(): GenericAPIResponse;
    submitLendingOffer(params: NewLendingOfferReq): GenericAPIResponse;
    /**
     *
     * Misc Endpoints (fills, & funding)
     * https://docs.ftx.com/#fills
     *
     **/
    getFills(params: FillsReq): GenericAPIResponse;
    getFundingPayments(params?: FundingPaymentsReq): GenericAPIResponse;
    /**
     *
     * Leveraged Tokens Endpoints
     * https://docs.ftx.com/#leveraged-tokens
     *
     **/
    listLeveragedTokens(): GenericAPIResponse;
    getLeveragedTokenInfo(tokenName: string): GenericAPIResponse;
    getLeveragedTokenBalances(): GenericAPIResponse;
    listLeveragedTokenCreationRequests(): GenericAPIResponse;
    requestLeveragedTokenCreation(tokenName: string, size: number): GenericAPIResponse;
    listLeveragedTokenRedemptionRequests(): GenericAPIResponse;
    requestLeveragedTokenRedemption(tokenName: string, size: number): GenericAPIResponse;
    /**
     *
     * Options Endpoints
     * https://docs.ftx.com/#options
     *
     **/
    listQuoteRequests(): GenericAPIResponse;
    getMyQuoteRequests(): GenericAPIResponse;
    createQuoteRequest(params: NewQuoteReq): GenericAPIResponse;
    cancelQuoteRequest(quoteRequestId: string): GenericAPIResponse;
    getQuotesForQuoteRequest(quoteRequestId: string): GenericAPIResponse;
    createQuote(quoteRequestId: string, price: number): GenericAPIResponse;
    getMyQuotes(): GenericAPIResponse;
    cancelQuote(quoteId: string): GenericAPIResponse;
    acceptOptionsQuote(quoteId: string): GenericAPIResponse;
    getOptionsAccountInfo(): GenericAPIResponse;
    getOptionsPositions(): GenericAPIResponse;
    getPublicOptionsTrades(params?: TimeRangeLimit): GenericAPIResponse;
    getOptionsFills(params?: TimeRangeLimit): GenericAPIResponse;
    get24hOptionVolume(): GenericAPIResponse;
    getOptionsHistoricalVolumes(params?: TimeRangeLimit): GenericAPIResponse;
    getOptionsOpenInterest(): GenericAPIResponse;
    getOptionsHistoricalOpenInterest(params?: TimeRangeLimit): GenericAPIResponse;
    /**
     *
     * SRM Staking Endpoints
     * https://docs.ftx.com/#srm-staking
     *
     **/
    getStakes(): GenericAPIResponse;
    getUnstakeRequests(): GenericAPIResponse;
    getStakeBalances(): GenericAPIResponse;
    createUnstakeRequest(coin: string, size: number): GenericAPIResponse;
    cancelUnstakeRequest(unstakeRequestId: string): GenericAPIResponse;
    getStakingRewards(): GenericAPIResponse;
    createStakeRequest(coin: string, size: number): GenericAPIResponse;
    getServerTime(): GenericAPIResponse;
    getApiKeyInfo(): GenericAPIResponse;
    /**
     *
     * NFT Endpoints
     * https://docs.ftx.com/#nfts
     *
     **/
    listNfts(): GenericAPIResponse;
    getNftInfo(nftId: number): GenericAPIResponse;
    getNftTrades(nftId: number, params?: TimeRange): GenericAPIResponse;
    getAllNftTrades(params?: TimeRangeLimit): GenericAPIResponse;
    getNftAccountInfo(nftId: number): GenericAPIResponse;
    getNftCollections(): GenericAPIResponse;
    getNftBalances(): GenericAPIResponse;
    makeNftOffer(params: NftBidReq): GenericAPIResponse;
    buyNft(params: NftBidReq): GenericAPIResponse;
    createNftAuction(params: NftAuctionReq): GenericAPIResponse;
    editNftAuction(params: NftAuctionEditReq): GenericAPIResponse;
    cancelNftAuction(params: CancelNftAuctionReq): GenericAPIResponse;
    placeNftBid(params: NftBidReq): GenericAPIResponse;
    getNftDeposits(params: Required<TimeRange>): GenericAPIResponse;
    getNftWithdrawls(params: Required<TimeRange>): GenericAPIResponse;
    getNftFills(params: Required<TimeRange>): GenericAPIResponse;
    redeemNft(params: RedeemNftReq): GenericAPIResponse;
    getNftGallery(gallery_id: number): GenericAPIResponse;
    getNftGallerySettings(): GenericAPIResponse;
    editNftGallerySettings(params: EditNftGallerySettingsReq): GenericAPIResponse;
    /**
     * @deprecated move this somewhere else, because endpoints shouldn't be hardcoded here
     */
    getTimeOffset(): Promise<number>;
}
