export enum DepositMethodsEnum {
  BANK_TRANSFER = 'BANK_TRANSFER',
  USSD = 'USSD',
  VirtualId = 'VirtualId',
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

export interface SubWalletResponseDto {
    statusCode: string;
    message: string;
    data: SubWalletDto;
    errors:{};
}

export interface WalletDepositResponseDto {
  statusCode:string;
  message:string;
  data: WalletDepositDto
  errors?: {};
}

export interface WalletDepositDto {
  amount: string;
  reference: string;
  currency: 'NGN';
  narration: string;
  status: string;
  nextAction:{};
}

export interface ResponseDto {
  statusCode: number;
  message: string;
  data: any;
  errors?: {};
} 

export interface AddCardDto {
  expiryMonth: string;
  expiryYear: string;
  cardNumber: string;
  cvv: string;
  cardHolderName: string;
}

export interface AddUssdDto {
  bankCode: string;
}

export interface BalanceDto {
  balance: string;
}

export interface BalanceResponseDto {
  statusCode: number;
  message: string;
  data: BalanceDto;
  errors?: {};
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
  errors?: {};
}

export interface UserWalletDto {
  nairaBalance: number;
  evmPortfolio?: any;
  solPortfolio?: any;
  subwallets: SubWalletDto[];
}

export interface UserWalletResponseDto {
  statusCode: number;
  message: string;
  data: UserWalletDto;
  errors?: {};
}

export interface BankDto {
  id: string;
  code: string;
  name: string;
}

export interface BankListResponseDto {
  statusCode: number;
  message: string;
  data: BankDto[];
  errors?: {};
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
  errors?: {};
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
  errors?: {};
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

export interface CreateVirtualAccountDataDto {
  nin: string;
  reference?: string;
}

export interface VirtualAccountResponseDto {
  statusCode: number;
  message: string;
  data: VirtualAccountDto;
  errors?: {};
}

export interface VirtualAccountDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string | null;
  accountNumber: string;
  bankName: string;
  reference: string;
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

export interface TransferDto {
  receiver: string;
  amount: number;
  transactionPin: string;
  currency: string;
}

export interface DepositAuthResponseDto {
    statusCode: number;
    message: string;
    data: {};
    errors: {};
}

export interface StatusResponseDto {
    statusCode: number;
    message: string;
    data: {};
    errors: {};
}



