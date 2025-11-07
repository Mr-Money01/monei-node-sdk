export interface UserTokenBalanceDto {
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  logoUrl?: string;
  type: 'native' | 'token';
  balance: string;
  balanceUSD: string;
  priceUSD: string;
  rawBalance: string;
  network: string;
}

export interface UserEvmPortfolioDto {
  userId: string;
  walletAddress: string;
  network: string;
  totalPortfolioValueUSD: string;
  nativeToken: UserTokenBalanceDto;
  tokens: UserTokenBalanceDto[];
  updatedAt: string;
}

export interface UserEvmPortfolioResponseDto {
  statusCode: number;
  message: string;
  data: UserEvmPortfolioDto;
}

export interface SendNativeTokenDto {
  to: string;
  amount: string;
  chainId: number;
}

export interface SendTokenDto {
  to: string;
  tokenAddress: string;
  amount: string;
  chainId: number;
}

export interface TransactionResponse {
  txHash: string;
}

export interface SendNativeTokenResponseDto {
  statusCode: number;
  message: string;
  data: TransactionResponse;
}

export interface SendTokenResponseDto {
  statusCode: number;
  message: string;
  data: TransactionResponse;
}