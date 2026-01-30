export type DepositMethod = 'BANK_TRANSFER' | 'USSD' | 'CARD' ;

export enum DepositMethodsEnum {
  BANK_TRANSFER = 'BANK_TRANSFER',
  USSD = 'USSD',
  VirtualId = 'VirtualId',
}


export interface WalletDepositResponseDto {
  statusCode:string;
  message:string;
  data: WalletDepositDto
}

export interface WalletDepositDto {
  amount: string;
  reference: string;
  currency: 'NGN';
  narration: string;
  status: string;
  nextAction:{};
}

export interface WalletDepositDataDto {
  amount: number;
  reference: string;
  currency: 'NGN';
  narration: string;
  card?: CardDto;
  ussd?: UssdDto;
  virtualAccountId?: string;
}


export interface paymentMethodDto {
  type: 'CARD' | 'BANK_TRANSFER' | 'USSD';
  nickname?: string;
  subWalletId: string;
  card?: CardDto;
  virtualAccountId?: string;
  ussd?: UssdDto;
}

export interface paymentMethodResponseDto {
  statusCode: number;
  message: string;
  data: paymentMethodDetailsDto;
}

export interface paymentMethodsResponseDto {
  statusCode: number;
  message: string;
  data: paymentMethodDetailsDto[];
}



export interface paymentMethodDetailsDto {
  id: string;
  type: 'CARD' | 'BANK_TRANSFER' | 'USSD';
  status: string;
  isDefault: boolean;
  nickname?: string;
  isEnabled: boolean;
  lastUsedAt: string | null;
  usageCount: number;
  capability: {};
  details: {};
  createdAt: string;
  updatedAt: string;
}

export interface ResponseDto {
  statusCode: number;
  message: string;
  data: any;
} 

export interface paymentLinkResponseDto {
  statusCode: number;
  message: string;
  data: LinkDto;
}


export interface paymentDataDto {
  amount: number;
  paymentMethodId: string;
  reference: string;
  currency: 'NGN';
  redirectUrl: string;
  meta: Record<string, any>;
  narration: string;
}


export interface CardDto {
  expiryMonth: string;
  expiryYear: string;
  cardNumber: string;
  cvv: string;
  cardHolderName: string;
}

export interface UssdDto {
  bankCode: string;
}

export interface BalanceDto {
  balance: string;
}

export interface BalanceResponseDto {
  statusCode: number;
  message: string;
  data: BalanceDto;
}

interface Customization {
    title?: string;
}

interface Customer {
  email: string
  phoneNumber: string
  name: string
}

export interface FundWalletByNairaDto {
  amount: number;
  reference?: string;
  currency?: string;
  redirectUrl?: string;
  customization?: Customization;
  customer?: Customer
}

export interface DepositResponseDto {
  link: string;
}

export interface FundWalletByNairaResponseDto {
  statusCode: number;
  message: string;
  data: DepositResponseDto;
}

export interface SubWalletDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string;
  parentWalletId: string;
  type: 'FIAT' | 'CRYPTO';
  currency: string;
  balance: number;
  chain?: string;
  publicAddress?: string;
  evmPortfolio?: any;
  solPortfolio?: any;
}

export interface UserWalletDto {
  nairaBalance: number;
  evmPortfolio?: any;
  solPortfolio?: any;
  subwallets: SubWalletDto[];
}

export interface BankDto {
  swiftCode?: string;
  bic?: string;
  isMobileVerified?: boolean;
  isCashPickUp: boolean;
  nibssCode: string;
  id: string;
  code: string;
  name: string;
  branches: any[];
}

export interface BankListResponseDto {
  statusCode: number;
  message: string;
  data: BankDto[];
}

export interface VerifyBankAccountRequestDto {
  accountNumber: string;
  bank: string;
}

export interface BankAccountDto {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
}

export interface BankAccountResponseDto {
  statusCode: number;
  message: string;
  data: BankAccountDto;
}

export interface WithdrawWalletDto {
  amount: number;
  bank: string;
  accountNumber: string;
  transactionPin: string;
  currency?: string;
  reference?: string;
  narration?: string;
}

export interface WithdrawResponseDto {

}

export interface PeerTransferDto {
  receiver: string;
  amount: number;
  transactionPin: string;
  currency?: string;
}

export interface VerifyBvnDto {
  bvn: string;
}

export interface UserKycInfoDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string;
  verificationStatus: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNo: string;
  pixBase64: string;
  kycStatus: string;
  verifiedAt: string;
}

export interface WithdrawDto {
  reference: string;
  status: string;
  amount: number;
}

export interface WalletResponseDto {
  statusCode: number;
  message: string;
  data: WithdrawDto;
}

export interface WalletOverviewDto {
  nairaBalance: string;
  subwallets: SubwalletDto[];
}

export interface SubwalletDto {
  id: string;
  type: 'CRYPTO' | 'FIAT';
  virtualAccount: string | null;
  currency: string;
  balance: number;
  chain: 'SOLANA' | 'EVM' | null;
  publicAddress: string | null;
  createdAt: string;
  updatedAt: string;
  deletedDate: string | null;

  solPortfolio?: SolPortfolioDto;
  evmPortfolio?: EvmPortfolioDto;
}

export interface SolPortfolioDto {
  userId: string;
  address: string;
  nativeBalance: string;
  nativeBalanceLamports: string;
  tokens: SolTokenDto[];
}

export interface SolTokenDto {
  mintAddress: string;
  name: string;
  symbol: string;
  balance: number;
  rawBalance: string;
  decimals: number;
}

export interface EvmPortfolioDto {
  userId: string;
  walletAddress: string;
  network: string;
  totalPortfolioValueUSD: string;
  nativeToken: EvmNativeTokenDto;
  tokens: EvmTokenDto[];
  updatedAt: string;
}

export interface EvmNativeTokenDto {
  name: string;
  symbol: string;
  decimals: number;
  logoUrl: string;
  balance: string;
  balanceUSD: string;
  priceUSD: string;
  rawBalance: string;
  network: string;
  type: 'native';
}

export interface EvmTokenDto {
  name: string;
  symbol: string;
  decimals: number;
  logoUrl?: string;
  balance: string;
  balanceUSD: string;
  priceUSD: string;
  rawBalance: string;
  contractAddress: string;
  network: string;
  type: 'erc20';
}

export interface VirtualDataDto {
  nin: string;
  reference?: string;
}

export interface VirtualAccountResponseDto {
  statusCode: number;
  message: string;
  data: VirtualAccountDto;
}

export interface VirtualAccountDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string | null;

  subWallet: virtualSubWalletDto | Record<string, never>;

  accountNumber: string;
  bankName: string;
  reference: string;
  flwId: string;
  status: string;
  isActive: boolean;
}

export interface virtualSubWalletDto {
  id: string;
  type: 'CRYPTO' | 'FIAT';
  currency: string;
  balance: number;
  chain: 'EVM' | 'SOLANA' | null;
  publicAddress: string | null;
}

export interface authorizationDto {
  type: 'pin';
  reference: string;
  pin: string;
  otp: string;
  avs: AvsDto;
}

export interface AvsDto {
  address: AvsAddressDto;
}

export interface AvsAddressDto {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface PaymentLinkDataDto {
  amount: number;
  reference?: string;
  currency?: string;
  redirectUrl?: string;
  customization?: Customization;
  customer?: Customer
}

interface Customization {
    title?: string;
}

interface Customer {
  email: string
  phoneNumber: string
  name: string
}

export interface PaymentResponseDto {
  statusCode: number;
  message: string;
  data: LinkDto;
}

export interface LinkDto {
  link: string;
}

export interface TransferDto {
  receiver: string;
  amount: number;
  transactionPin: string;
  currency: string;
}





