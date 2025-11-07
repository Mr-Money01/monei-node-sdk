export interface BalanceDto {
  balance: string;
}

export interface BalanceResponseDto {
  statusCode: number;
  message: string;
  data: BalanceDto;
}

export interface FundWalletByNairaDto {
  amount: number;
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
  narration?: string;
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