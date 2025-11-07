export type SolanaNetwork = 'mainnet-beta' | 'devnet' | 'testnet';

export interface AddressDto {
  address: string;
}

export interface WalletAddressResponseDto {
  statusCode: number;
  message: string;
  data: AddressDto;
}

export interface TokenInfoDto {
  mintAddress: string;
  name: string;
  symbol: string;
  balance: string;
  rawBalance: string;
  decimals: number;
  priceUsd: number;
  valueUsd: number;
}

export interface PortfolioDto {
  userId: string;
  address: string;
  nativeBalance: string;
  nativeBalanceLamports: string;
  nativeBalanceUsd: number;
  tokens: TokenInfoDto[];
  totalValueUsd: number;
}

export interface PortfolioResponseDto {
  statusCode: number;
  message: string;
  data: PortfolioDto;
}

export interface TransferSolDto {
  to: string;
  amount: string;
  network?: SolanaNetwork;
}

export interface TransferTokenDto {
  to: string;
  tokenMintAddress: string;
  amount: string;
  network?: SolanaNetwork;
}

export interface SignatureDto {
  signature: string;
}

export interface SignatureResponseDto {
  statusCode: number;
  message: string;
  data: SignatureDto;
}