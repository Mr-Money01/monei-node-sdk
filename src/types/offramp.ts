import { OfframpStatus,WalletType,OfframpCurrency, Providers, OfframpAssets,OfframpNetworks } from "./enums/offramp.enum";


export interface OfframpQuoteRequestDto {
  token: string;
  network: string;
  amount: string;
  fiat?: string;
}

export interface AssetsResponseDto {
  statusCode: number;
  message: string;
  data: any[];
  errors?: {};
}

export interface OfframpExchangeRateDto {
  token: string;
  network: string;
  amount: string;
  fiat?: string;
  rate?: number;
}

export interface OfframpQuoteResponseDto {
  statusCode: number;
  message: string;
  data: OfframpExchangeRateDto;
  errors?: {};
}

export interface SwapCryptoToFiatRequestDto {
  amount: string;
  token: string;
  network: number;
  fiatCurrency: string;
  bankCode: number;
  accountNumber: string;
  accountName: string;
}

export interface CryptoAmountDto {
  value: number;
  asset: OfframpAssets;
  network: OfframpNetworks;
}

export interface FiatAmountDto {
  value: number;
  currency: OfframpCurrency;
}

export interface AmountsDto {
  crypto: CryptoAmountDto;
  fiat: FiatAmountDto;
  exchangeRate: number;
  totalFee: number;
}

export interface BeneficiaryDto {
  bankCode: string;
  bankName: string;
  amountNumber: string; // Note: This might be a typo in original, possibly meant "accountNumber"
  accountName: number; // Note: This is 'number' in original but likely should be string
}

export interface OnChainDto {
  depositAddress: string;
  txHash: string;
  sourceWallet: WalletType;
}

export interface TimestampsDto {
  created: string;
  updated: string;
  completed?: string;
  failed?: string;
  depositDetected?: string;
  depositConfirmed?: string;
  depositExpires?: string;
}

export interface OfframpOrderResponseDataDto {
  id: string;
  reference: string;
  status: OfframpStatus;
  amounts: AmountsDto;
  beneficiary: BeneficiaryDto;
  onChain: OnChainDto;
  //provider: Providers;
  //providerReference: string;
  meta?: Record<string, any>;
  failureReason?: string;
  timestamps: TimestampsDto;
}

export interface OfframpOrderResponseDto {
  statusCode: number;
  message: string;
  data: OfframpOrderResponseDataDto;
  errors?: Record<string, any>;
}

export interface PayoutBankDto {
  name: string;
  code: string;
}

export interface PayoutBanksResponseDto {
  statusCode: number;
  message: string;
  data: PayoutBankDto[];
  errors?: Record<string, any>;
}

export interface VerifyOfframpBankAccountResponseDataDto {
  bankCode: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface VerifyOfframpBankAccountResponseDto {
  statusCode: number;
  message: string;
  data: VerifyOfframpBankAccountRequestDto; // Note: This references the request DTO, might need VerifyOfframpBankAccountResponseDataDto
  errors?: Record<string, any>;
}

export interface VerifyOfframpBankAccountRequestDto {
  bankCode: string;
  accountNumber: string;
}

export interface OfframpHistoryRequestDto {
  limit?: string;
  page?: string;
}

export interface OfframpTransactionResponseDto {
  id: string;
  internalReference: string;
  provider: string;
  providerTransactionId: string;
  status: OfframpStatus;
  cryptoAmount: number;
  fiatAmount: number;
  exchangeRate: number;
  fromCurrency: string;
  toCurrency: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface OfframpTransactionListResponseDto {
  ststusCode: number; // Note: Typo in original - 'ststusCode' instead of 'statusCode'
  message: string;
  data: OfframpTransactionResponseDto[];
  meta?: Record<string, any>;
}

export interface OfframpTransactionDetailResponseDto {
  id: string;
  internalReference: string;
  provider: string;
  providerTransactionId: string;
  status: OfframpStatus;
  cryptoAmount: number;
  fiatAmount: number;
  exchangeRate: number;
  fromCurrency: string;
  toCurrency: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  providerStatus: string;
  fees?: Record<string, any>;
  debitPaymentDetails?: Record<string, any>;
  creditPaymentDetails?: Record<string, any>;
  completedAt: string;
}

export interface OfframpStatusRequestDto {
  reference: string;
}