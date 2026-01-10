import { WalletService } from '../../src/services/WalletService';
import { createTestWalletService, requireApiKey } from '../utils/test-setup';
import {
  FundWalletByNairaDto,
  VerifyBankAccountRequestDto,
  VerifyBvnDto,
  WithdrawWalletDto
} from '../../src/types';

describe('WalletService Integration Tests', () => {
  let walletService: WalletService;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    walletService = createTestWalletService();
  });

  describe('getWalletBalance', () => {
    it('should get actual wallet balance from API', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await walletService.getWalletBalance();

      // Assert
      expect(result).toHaveProperty('nairaBalance');
      expect(result).toHaveProperty('subwallets');
      expect(Array.isArray(result.subwallets)).toBe(true);
      
      console.log('Wallet balance:', {
        nairaBalance: result.nairaBalance,
        totalSubwallets: result.subwallets.length,
        subwalletTypes: result.subwallets.map(sw => sw.type)
      });
    }, 30000);
  });

  describe('getNativeBalance', () => {
    it('should get native balance for Ethereum mainnet', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const chainId = 1; // Ethereum mainnet

      // Act
      const result = await walletService.getNativeBalance(chainId);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('balance');
      
      console.log('Native ETH balance:', result.data.balance);
    }, 30000);

    it('should get native balance for different chains', async () => {
      if (!requireApiKey()) return;

      const testChains = [
        { chainId: 56, name: 'BSC' },
        { chainId: 137, name: 'Polygon' },
      ];

      for (const { chainId, name } of testChains) {
        const result = await walletService.getNativeBalance(chainId);
        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('balance');
        console.log(`Native balance on ${name}:`, result.data.balance);
      }
    }, 45000);
  });

  describe('getBanks', () => {
    it('should get actual list of banks from API', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await walletService.getBanks();

      // Assert
      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      
      // Verify bank structure
      const firstBank = result.data[0];
      expect(firstBank).toHaveProperty('id');
      expect(firstBank).toHaveProperty('name');
      expect(firstBank).toHaveProperty('code');
      
      console.log('Total banks:', result.data.length);
      console.log('First bank:', firstBank.name, firstBank.code);
    }, 30000);
  });

  describe('verifyBankAccount', () => {
    it('should verify a test bank account', async () => {
      if (!requireApiKey()) return;

      // Arrange - Use test account numbers provided by your payment provider
      const verifyData: VerifyBankAccountRequestDto = {
        accountNumber: '0736379044', // Use actual test account number
        bank: '058' // Access Bank code
      };

      // Act
      const result = await walletService.verifyBankAccount(verifyData);

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data).toHaveProperty('accountName');
      expect(result.data).toHaveProperty('accountNumber');
      expect(result.data).toHaveProperty('bankCode');
      
      console.log('Verified account:', result.data.accountName);
    }, 30000);
  });

  describe('withdrawFromWallet', () => {
    it('should send money to a bank account', async () => {
        if(!requireApiKey()) return;

        const withdrawData: WithdrawWalletDto = {
            amount: 100,
            bank: "058",
            accountNumber: "0736379044",
            transactionPin: "",
            currency: "NGN",
            reference: "5434532fgdsgdsgvds65365326532",
            narration: "integration test"
        };

        const result = await walletService.withdrawFromWallet(withdrawData);

        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty("reference");
        expect(result.data).toHaveProperty("status");
        expect(result.data).toHaveProperty("amount");

        console.log("Transaction Reference", result.data.reference)

    }, 30000)
  })

  describe('fundWalletByNaira', () => {
    it('should create funding request for small amount', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const fundData: FundWalletByNairaDto = {
        amount: 100,
        reference: "5632654643bndsbsbs325353274378438",
        redirectUrl: "https://citizen.com",
        customization: {
          title: "Citizen"
        }
      };

      // Act
      const result = await walletService.fundWalletByNaira(fundData);

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data).toHaveProperty('link');
      expect(result.data.link).toContain('http');
      
      console.log('Funding link:', result.data.link);
    }, 30000);
  });

  // Skip BVN verification in automated tests as it requires real BVN
  describe.skip('verifyBvn', () => {
    it('should verify BVN with test data', async () => {
      if (!requireApiKey()) return;

      // Arrange - Use test BVN provided by your verification provider
      const bvnData: VerifyBvnDto = {
        bvn: '12345678901' // Use actual test BVN
      };

      // Act
      const result = await walletService.verifyBvn(bvnData);

      // Assert
      expect(result).toHaveProperty('verificationStatus');
      expect(result).toHaveProperty('kycStatus');
    }, 30000);
  });
});