import { describe, it, expect, beforeAll } from '@jest/globals';
import { WalletUtilityService } from '../../../src/services/wallet/WalletUtility.service';
import { createTestWalletUtility, requireApiKey } from '../../utils/test-setup';
import {
  
  VerifyBankAccountRequestDto,
  VerifyBvnDto,
  WithdrawWalletDto
} from '../../../src/types';

describe('WalletServiceUtilities Integration Tests', () => {
  let walletService: WalletUtilityService;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    walletService = createTestWalletUtility();
  });

  describe('getBanks', () => {
      it('should get actual list of banks from API', async () => {
        if (!requireApiKey()) return;
  
        // Act
        const result = await walletService.getBanks();
        console.log('Retrieved banks:', result);

        // Assert
        
        
        
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
      
      console.log('Verified account:', result);
    }, 30000);
  });

});


