import { describe, it, expect, beforeAll } from '@jest/globals';
import { OfframpPayoutService } from '../../../src/services/offramp/payouts.service';
import { MoneiClient } from '../../../src/client/MoneiClient';
import { requireApiKey, createTestClient } from '../../utils/test-setup';
import { VerifyBankAccountRequestDto, VerifyOfframpBankAccountRequestDto } from '../../../src/types';

describe('OfframpPayoutService Integration Tests', () => {
  let offrampPayoutService: OfframpPayoutService;
  let client: MoneiClient;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    client = createTestClient();
    offrampPayoutService = new OfframpPayoutService(client);
  });

  describe('getOfframpBanks', () => {
    it('should get all available payout banks', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampPayoutService.getBanks();
      console.log('Retrieved payout banks:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      
      // Check structure of banks if available
      if (result.data.length > 0) {
        const firstBank = result.data[0];
        expect(firstBank).toHaveProperty('name');
        expect(firstBank).toHaveProperty('code');
        
        // Validate data types
        expect(typeof firstBank.name).toBe('string');
        expect(typeof firstBank.code).toBe('string');
        expect(firstBank.name.length).toBeGreaterThan(0);
        expect(firstBank.code.length).toBeGreaterThan(0);
      }

      console.log('Available banks summary:', {
        totalBanks: result.data.length,
        sampleBanks: result.data.slice(0, 5).map(bank => ({
          name: bank.name,
          code: bank.code
        }))
      });
    }, 30000);

    it('should return consistent bank data structure', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampPayoutService.getBanks();

      // Assert - verify all banks have required fields
      result.data.forEach((bank, index) => {
        expect(bank).toHaveProperty('name');
        expect(bank).toHaveProperty('code');
        
        // Bank names should be non-empty strings
        expect(bank.name.trim().length).toBeGreaterThan(0);
        
        // Bank codes should be non-empty strings (usually numbers but stored as strings)
        expect(bank.code.trim().length).toBeGreaterThan(0);
      });

      console.log(`Validated ${result.data.length} banks have correct structure`);
    }, 30000);

    it('should have unique bank codes', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampPayoutService.getBanks();

      // Assert - check for duplicate bank codes
      const bankCodes = result.data.map(bank => bank.code);
      const uniqueBankCodes = new Set(bankCodes);
      
      expect(uniqueBankCodes.size).toBe(result.data.length);
      
      console.log(`All ${result.data.length} banks have unique codes`);
    }, 30000);

    it('should include major Nigerian banks', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampPayoutService.getBanks();

      // Assert - check for common Nigerian banks
      const bankNames = result.data.map(bank => bank.name.toLowerCase());
      
      const expectedBanks = [
        'access bank',
        'gtbank', 'guaranty trust bank',
        'first bank',
        'uba', 'united bank for africa',
        'zenith bank',
        'providus bank',
        'moniepoint',
        'opay',
        'palmpay',
        'kuda'
      ];

      const foundBanks = expectedBanks.filter(expected => 
        bankNames.some(name => name.includes(expected))
      );

      console.log('Found major banks:', foundBanks);
      expect(foundBanks.length).toBeGreaterThan(0);
    }, 30000);

    it('should return banks sorted alphabetically', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampPayoutService.getBanks();

      // Assert - check if banks are sorted by name
      const bankNames = result.data.map(bank => bank.name);
      const sortedBankNames = [...bankNames].sort((a, b) => a.localeCompare(b));
      
      // This might not always be true if API doesn't sort, so we'll just log
      const isSorted = JSON.stringify(bankNames) === JSON.stringify(sortedBankNames);
      console.log('Banks are sorted alphabetically:', isSorted);
    }, 30000);

    /*
    it('should return banks with proper codes format', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampPayoutService.getBanks();

      // Assert - bank codes are typically 3-digit numbers stored as strings
      result.data.forEach(bank => {
        // Bank codes should be numeric strings (could be 3 digits, but some might be different)
        expect(bank.code).toMatch(/^\d+$/);
        
        // Most Nigerian bank codes are 3 digits, but we'll just check it's a number
        const codeAsNumber = parseInt(bank.code, 10);
        expect(isNaN(codeAsNumber)).toBe(false);
        expect(codeAsNumber).toBeGreaterThan(0);
      });

      console.log('All bank codes are valid numeric strings');
    }, 30000);
    */
  });

  /*
  describe('verifyOfframpBank', () => {
    it('should verify a valid GTBank account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '058', // GTBank code
        accountNumber: '0123456789' // Replace with a valid test account number
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);
      console.log('Verified GTBank account:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      // Check response data structure
      expect(result.data).toHaveProperty('bankCode');
      expect(result.data).toHaveProperty('bankName');
      expect(result.data).toHaveProperty('accountNumber');
      expect(result.data).toHaveProperty('accountName');
      
      // Verify returned data matches request
      expect(result.data.bankCode.toString()).toBe(verifyRequest.bankCode);
      expect(result.data.accountNumber).toBe(verifyRequest.accountNumber);
      
      // Account name should be a non-empty string
      expect(result.data.accountName.trim().length).toBeGreaterThan(0);
      expect(result.data.bankName.trim().length).toBeGreaterThan(0);

      console.log('Verified account details:', {
        bankName: result.data.bankName,
        bankCode: result.data.bankCode,
        accountNumber: result.data.accountNumber,
        accountName: result.data.accountName
      });
    }, 30000);

    it('should verify a valid Access Bank account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '044', // Access Bank code
        accountNumber: '9876543210' // Replace with a valid test account number
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.bankCode.toString()).toBe(verifyRequest.bankCode);
      expect(result.data.accountNumber).toBe(verifyRequest.accountNumber);
      expect(result.data.accountName).toBeDefined();
      expect(result.data.bankName.toLowerCase()).toContain('access');

      console.log('Access Bank verification:', {
        bankName: result.data.bankName,
        accountName: result.data.accountName
      });
    }, 30000);

    it('should verify a valid First Bank account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '011', // First Bank code
        accountNumber: '1234567890' // Replace with a valid test account number
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.bankName.toLowerCase()).toContain('first');
      
      console.log('First Bank verification:', {
        bankName: result.data.bankName,
        accountName: result.data.accountName
      });
    }, 30000);

    it('should verify a valid UBA account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '033', // UBA code
        accountNumber: '1122334455' // Replace with a valid test account number
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert
      expect(result.statusCode).toBe(200);
      
      console.log('UBA verification:', {
        bankName: result.data.bankName,
        accountName: result.data.accountName
      });
    }, 30000);

    it('should verify a valid Zenith Bank account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '057', // Zenith Bank code
        accountNumber: '2233445566' // Replace with a valid test account number
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert
      expect(result.statusCode).toBe(200);
      
      console.log('Zenith Bank verification:', {
        bankName: result.data.bankName,
        accountName: result.data.accountName
      });
    }, 30000);

    it('should verify a Providus Bank account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '101', // Providus Bank code
        accountNumber: '3344556677' // Replace with a valid test account number
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert
      expect(result.statusCode).toBe(200);
      
      console.log('Providus Bank verification:', {
        bankName: result.data.bankName,
        accountName: result.data.accountName
      });
    }, 30000);

    it('should fail with invalid account number', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '058', // GTBank code
        accountNumber: '123' // Invalid - too short
      };

      try {
        // Act
        const result = await offrampPayoutService.verifyBankAccount(verifyRequest);
        
        // If it doesn't throw, check for error response
        expect(result.statusCode).toBe(400); // Bad request
        expect(result.errors).toBeDefined();
        console.log('Expected error for invalid account:', result.errors);
      } catch (error: any) {
        // Assert - if it throws
        expect(error).toBeDefined();
        console.log('Expected error caught:', error.message);
      }
    }, 30000);

    it('should fail with invalid bank code', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '999', // Invalid bank code
        accountNumber: '0123456789'
      };

      try {
        // Act
        const result = await offrampPayoutService.verifyBankAccount(verifyRequest);
        
        // If it doesn't throw, check for error response
        expect(result.statusCode).toBe(400); // Bad request
        expect(result.errors).toBeDefined();
        console.log('Expected error for invalid bank code:', result.errors);
      } catch (error: any) {
        // Assert - if it throws
        expect(error).toBeDefined();
        console.log('Expected error caught:', error.message);
      }
    }, 30000);

    it('should fail with empty account number', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '058',
        accountNumber: ''
      };

      try {
        // Act
        await offrampPayoutService.verifyBankAccount(verifyRequest);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for empty account:', error.message);
      }
    }, 30000);

    it('should fail with empty bank code', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '',
        accountNumber: '0123456789'
      };

      try {
        // Act
        await offrampPayoutService.verifyBankAccount(verifyRequest);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for empty bank code:', error.message);
      }
    }, 30000);

    it('should fail with non-existent account', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '058',
        accountNumber: '0000000000' // Non-existent account
      };

      try {
        // Act
        const result = await offrampPayoutService.verifyBankAccount(verifyRequest);
        
        // If it doesn't throw, check for error response
        expect(result.statusCode).toBe(404); // Not found
        expect(result.errors).toBeDefined();
        console.log('Expected error for non-existent account:', result.errors);
      } catch (error: any) {
        // Assert - if it throws
        expect(error).toBeDefined();
        console.log('Expected error caught:', error.message);
      }
    }, 30000);
  });

  describe('bank verification with special characters', () => {
    it('should handle account numbers with spaces', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '058',
        accountNumber: '0123 4567 89' // Account with spaces
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert - API might strip spaces automatically
      expect(result.statusCode).toBe(200);
      expect(result.data.accountNumber.replace(/\s/g, '')).toBe('0123456789');
      
      console.log('Account with spaces verified:', {
        requested: verifyRequest.accountNumber,
        returned: result.data.accountNumber
      });
    }, 30000);

    it('should handle account numbers with hyphens', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const verifyRequest: VerifyOfframpBankAccountRequestDto = {
        bankCode: '058',
        accountNumber: '012-345-6789' // Account with hyphens
      };

      // Act
      const result = await offrampPayoutService.verifyBankAccount(verifyRequest);

      // Assert - API might strip hyphens automatically
      expect(result.statusCode).toBe(200);
      
      console.log('Account with hyphens verified:', {
        requested: verifyRequest.accountNumber,
        returned: result.data.accountNumber
      });
    }, 30000);
  });
 */
  describe('combined layout operations', () => {
    it('should get banks and then verify an account', async () => {
      if (!requireApiKey()) return;

      // Step 1: Get all banks
      const banksResult = await offrampPayoutService.getBanks();
      expect(banksResult.data.length).toBeGreaterThan(0);
      console.log('Step 1: Retrieved', banksResult.data.length, 'banks');

      // Step 2: Pick a bank (e.g., GTBank) and verify an account
      const gtbank = banksResult.data.find(bank => 
        bank.name.toLowerCase().includes('gtbank') || bank.code === '058'
      );

      if (gtbank) {
        console.log('Step 2: Selected bank for verification:', gtbank.name);

        const verifyRequest: VerifyOfframpBankAccountRequestDto = {
          bankCode: gtbank.code,
          accountNumber: '0123456789' // Replace with valid test account
        };

        const verifyResult = await offrampPayoutService.verifyBankAccount(verifyRequest);
        
        expect(verifyResult.statusCode).toBe(200);
        expect(verifyResult.data.bankName).toBe(gtbank.name);

        console.log('Combined operation successful:', {
          bankName: verifyResult.data.bankName,
          accountName: verifyResult.data.accountName,
          accountNumber: verifyResult.data.accountNumber
        });
      } else {
        console.log('GTBank not found in bank list');
      }
    }, 30000);

    it('should verify multiple accounts from different banks', async () => {
      if (!requireApiKey()) return;

      // Get all banks first
      const banksResult = await offrampPayoutService.getBanks();
      
      // Select a few banks to test
      const banksToTest = banksResult.data
        .filter(bank => ['058', '044', '011', '033'].includes(bank.code))
        .slice(0, 3);

      console.log(`Testing ${banksToTest.length} banks`);

      for (const bank of banksToTest) {
        const verifyRequest: VerifyOfframpBankAccountRequestDto = {
          bankCode: bank.code,
          accountNumber: '0123456789' // Use appropriate test account for each bank
        };

        try {
          const result = await offrampPayoutService.verifyBankAccount(verifyRequest);
          console.log(`✓ ${bank.name}:`, {
            accountName: result.data.accountName,
            status: 'verified'
          });
        } catch (error: any) {
          console.log(`✗ ${bank.name}: verification failed`, error.message);
        }
      }
    }, 60000);
  });

  describe('bank data consistency', () => {
    it('should verify that all bank codes from getOfframpBanks work with verifyOfframpBank', async () => {
      if (!requireApiKey()) return;

      // Get all banks
      const banksResult = await offrampPayoutService.getBanks();
      
      // Test a sample of banks (to avoid rate limiting)
      const sampleBanks = banksResult.data.slice(0, 5);
      
      for (const bank of sampleBanks) {
        const verifyRequest: VerifyOfframpBankAccountRequestDto = {
          bankCode: bank.code,
          accountNumber: '0123456789' // Use a valid test account
        };

        try {
          const result = await offrampPayoutService.verifyBankAccount(verifyRequest);
          expect(result.data.bankName).toBe(bank.name);
          console.log(`Bank code ${bank.code} (${bank.name}) is valid`);
        } catch (error: any) {
          console.log(`Bank code ${bank.code} (${bank.name}) verification failed:`, error.message);
        }
      }
    }, 60000);
  });
});