import { WalletService } from '../../src/services/WalletService';
import { createMockMoneiClient } from '../mocks/monei-client.mock';
import {
  mockUserWallet,
  mockBalanceResponse,
  mockFundWalletResponse,
  mockBankListResponse,
  mockBankAccountResponse,
  mockUserKycInfo,
  mockWithdrawalResponse,
  mockPeerTransferResponse
} from '../mocks/api-responses.mock';
import {
  FundWalletByNairaDto,
  VerifyBankAccountRequestDto,
  WithdrawWalletDto,
  PeerTransferDto,
  VerifyBvnDto,
  UserWalletDto,
  BalanceResponseDto
} from '../../src/types';

describe('WalletService', () => {
  let walletService: WalletService;
  let mockClient: ReturnType<typeof createMockMoneiClient>;

  beforeEach(() => {
    mockClient = createMockMoneiClient();
    walletService = new WalletService(mockClient as any);
  });

  describe('getWalletBalance', () => {
    it('should return wallet balance without chainId', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockUserWallet);

      // Act
      const result = await walletService.getWalletBalance();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/wallet/me', { params: undefined });
      expect(result).toEqual(mockUserWallet);
      expect(result.nairaBalance).toBe(1000.50);
      expect(result.subwallets).toHaveLength(2);
    });

    it('should return wallet balance with chainId', async () => {
      // Arrange
      const chainId = 1;
      mockClient.get.mockResolvedValue(mockUserWallet);

      // Act
      const result = await walletService.getWalletBalance(chainId);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/wallet/me', {
        params: { chainId },
      });
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('getNativeBalance', () => {
    it('should return native balance for given chainId', async () => {
      // Arrange
      const chainId = 1;
      mockClient.get.mockResolvedValue(mockBalanceResponse);

      // Act
      const result = await walletService.getNativeBalance(chainId);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/evm/balance/native', {
        params: { chainId },
      });
      expect(result).toEqual(mockBalanceResponse);
      expect(result.statusCode).toBe(200);
      expect(result.data.balance).toBe('0.5');
    });

    it('should handle different chain IDs', async () => {
      // Arrange
      const chainIds = [1, 56, 137]; // Ethereum, BSC, Polygon
      
      for (const chainId of chainIds) {
        const chainSpecificResponse: BalanceResponseDto = {
          ...mockBalanceResponse,
          data: { balance: `0.${chainId}` }
        };
        mockClient.get.mockResolvedValue(chainSpecificResponse);
        
        // Act
        const result = await walletService.getNativeBalance(chainId);
        
        // Assert
        expect(mockClient.get).toHaveBeenCalledWith('/api/v1/evm/balance/native', {
          params: { chainId },
        });
        expect(result.data.balance).toBe(`0.${chainId}`);
      }
    });
  });

  describe('getTokenBalance', () => {
    it('should return token balance for specific token and chain', async () => {
      // Arrange
      const tokenAddress = '0x1234567890abcdef';
      const chainId = 1;
      mockClient.get.mockResolvedValue(mockBalanceResponse);

      // Act
      const result = await walletService.getTokenBalance(tokenAddress, chainId);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/evm/balance/token', {
        params: { tokenAddress, chainId },
      });
      expect(result).toEqual(mockBalanceResponse);
    });
  });

  describe('fundWalletByNaira', () => {
    it('should fund wallet with naira and return payment link', async () => {
      // Arrange
      const fundData: FundWalletByNairaDto = {
        amount: 5000,
      };
      mockClient.post.mockResolvedValue(mockFundWalletResponse);

      // Act
      const result = await walletService.fundWalletByNaira(fundData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/wallet/user/fund-wallet',
        fundData
      );
      expect(result).toEqual(mockFundWalletResponse);
      expect(result.data.link).toBe('https://payment.link/123');
      expect(result.statusCode).toBe(200);
    });

    it('should handle different funding amounts', async () => {
      // Arrange
      const amounts = [1000, 5000, 10000];
      
      for (const amount of amounts) {
        const fundData: FundWalletByNairaDto = { amount };
        const response = {
          ...mockFundWalletResponse,
          data: { link: `https://payment.link/${amount}` }
        };
        mockClient.post.mockResolvedValue(response);
        
        // Act
        const result = await walletService.fundWalletByNaira(fundData);
        
        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          '/api/v1/wallet/user/fund-wallet',
          fundData
        );
        expect(result.data.link).toBe(`https://payment.link/${amount}`);
      }
    });
  });

  describe('getBanks', () => {
    it('should return list of banks with proper structure', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockBankListResponse);

      // Act
      const result = await walletService.getBanks();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/wallet/get-banks');
      expect(result).toEqual(mockBankListResponse);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].name).toBe('Access Bank');
      expect(result.data[0].code).toBe('044');
      expect(result.data[1].name).toBe('First Bank');
      expect(result.data[1].code).toBe('011');
    });
  });

  describe('verifyBankAccount', () => {
    it('should verify bank account and return account details', async () => {
      // Arrange
      const verifyData: VerifyBankAccountRequestDto = {
        accountNumber: '1234567890',
        bank: '044',
      };
      mockClient.post.mockResolvedValue(mockBankAccountResponse);

      // Act
      const result = await walletService.verifyBankAccount(verifyData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/wallet/verify-bank-account',
        verifyData
      );
      expect(result).toEqual(mockBankAccountResponse);
      expect(result.data.accountName).toBe('John Doe');
      expect(result.data.accountNumber).toBe('1234567890');
      expect(result.data.bankCode).toBe('044');
    });
  });

  describe('withdrawFromWallet', () => {
    it('should withdraw from wallet successfully', async () => {
      // Arrange
      const withdrawData: WithdrawWalletDto = {
        amount: 1000,
        bank: '044',
        accountNumber: '1234567890',
        transactionPin: '1234',
        currency: 'NGN',
        narration: 'Test withdrawal'
      };
      mockClient.post.mockResolvedValue(mockWithdrawalResponse);

      // Act
      const result = await walletService.withdrawFromWallet(withdrawData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/wallet/withdrawals',
        withdrawData
      );
      expect(result).toEqual(mockWithdrawalResponse);
      expect(result.data.transactionId).toBe('withdraw-123');
    });
  });

  describe('peerTransfer', () => {
    it('should perform peer transfer successfully', async () => {
      // Arrange
      const transferData: PeerTransferDto = {
        receiver: 'user-456',
        amount: 500,
        transactionPin: '1234',
        currency: 'NGN'
      };
      mockClient.post.mockResolvedValue(mockPeerTransferResponse);

      // Act
      const result = await walletService.peerTransfer(transferData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/wallet/peer-transfer',
        transferData
      );
      expect(result).toEqual(mockPeerTransferResponse);
      expect(result.data.transferId).toBe('transfer-123');
    });
  });

  describe('verifyBvn', () => {
    it('should verify BVN and return KYC info', async () => {
      // Arrange
      const bvnData: VerifyBvnDto = {
        bvn: '12345678901',
      };
      mockClient.post.mockResolvedValue(mockUserKycInfo);

      // Act
      const result = await walletService.verifyBvn(bvnData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/wallet/kyc/bvn',
        bvnData
      );
      expect(result).toEqual(mockUserKycInfo);
      expect(result.verificationStatus).toBe('verified');
      expect(result.kycStatus).toBe('completed');
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
    });
  });
});