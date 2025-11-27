import {
  UserResponseDto,
  UserDto,
  UserWalletDto,
  BalanceResponseDto,
  FundWalletByNairaResponseDto,
  BankListResponseDto,
  BankAccountResponseDto,
  UserKycInfoDto
} from '../../src/types';

export const mockUserDto: UserDto = {
  id: 'user-123',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  deletedDate: '',
  firstName: 'John',
  lastName: 'Doe',
  name: 'John Doe',
  email: 'test@example.com',
  phone: '+1234567890',
  haveTransactionPin: true,
  verified: true,
  isAdmin: false,
  lastLoggedIn: '2023-01-01T00:00:00.000Z'
};

export const mockUserResponse: UserResponseDto = {
  statusCode: 200,
  message: 'Success',
  data: mockUserDto
};

export const mockUserWallet: UserWalletDto = {
  nairaBalance: 1000.50,
  subwallets: [
    {
      id: 'subwallet-123',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      deletedDate: '',
      parentWalletId: 'wallet-123',
      type: 'FIAT',
      currency: 'NGN',
      balance: 1000.50,
      chain: undefined,
      publicAddress: undefined,
      evmPortfolio: undefined,
      solPortfolio: undefined
    },
    {
      id: 'subwallet-456',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      deletedDate: '',
      parentWalletId: 'wallet-123',
      type: 'CRYPTO',
      currency: 'ETH',
      balance: 0.5,
      chain: 'ETH',
      publicAddress: '0x742E4C4F4B7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C',
      evmPortfolio: {},
      solPortfolio: undefined
    }
  ]
};

export const mockBalanceResponse: BalanceResponseDto = {
  statusCode: 200,
  message: 'Success',
  data: {
    balance: '0.5'
  }
};

export const mockFundWalletResponse: FundWalletByNairaResponseDto = {
  statusCode: 200,
  message: 'Success',
  data: {
    link: 'https://payment.link/123'
  }
};

export const mockBankListResponse: BankListResponseDto = {
  statusCode: 200,
  message: 'Success',
  data: [
    {
      id: '1',
      code: '044',
      name: 'Access Bank',
      nibssCode: '044',
      isCashPickUp: false,
      branches: [],
      swiftCode: 'ABNGNGLA',
      bic: 'ABNGNGLA',
      isMobileVerified: true
    },
    {
      id: '2',
      code: '011',
      name: 'First Bank',
      nibssCode: '011',
      isCashPickUp: false,
      branches: [],
      swiftCode: 'FBNINGLA',
      bic: 'FBNINGLA',
      isMobileVerified: true
    }
  ]
};

export const mockBankAccountResponse: BankAccountResponseDto = {
  statusCode: 200,
  message: 'Success',
  data: {
    accountNumber: '1234567890',
    accountName: 'John Doe',
    bankCode: '044',
    bankName: 'Access Bank'
  }
};

export const mockUserKycInfo: UserKycInfoDto = {
  id: 'kyc-123',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  deletedDate: '',
  verificationStatus: 'verified',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'Male',
  dateOfBirth: '1990-01-01',
  phoneNo: '+1234567890',
  pixBase64: 'base64string',
  kycStatus: 'completed',
  verifiedAt: '2023-01-01T00:00:00.000Z'
};

export const mockWithdrawalResponse = {
  statusCode: 200,
  message: 'Withdrawal successful',
  data: {
    transactionId: 'withdraw-123',
    status: 'pending'
  }
};

export const mockPeerTransferResponse = {
  statusCode: 200,
  message: 'Transfer successful',
  data: {
    transferId: 'transfer-123',
    status: 'completed'
  }
};