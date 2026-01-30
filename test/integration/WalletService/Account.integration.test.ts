import { describe, it, expect, beforeAll } from '@jest/globals';
import { WalletServiceAccount } from '../../../src/services/wallet-services/WalletService.Account';
import { createTestWalletAccount, requireApiKey } from '../../utils/test-setup';
import {
  FundWalletByNairaDto,
  VerifyBankAccountRequestDto,
  VerifyBvnDto,
  WithdrawWalletDto
} from '../../../src/types';

describe('WalletServiceAccount Integration Tests', () => {
  let walletService: WalletServiceAccount;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    walletService = createTestWalletAccount();
  });

  describe('getUserWallet', () => {
      it('should get user actual wallet ', async () => {
        if (!requireApiKey()) return;
  
        // Act
        const result = await walletService.getWallet();
        console.log('Retrieved wallet:', result);
  
        // Assert
        expect(result).toHaveProperty('data');
        //expect(result).toHaveProperty('subwallets');
        //expect(Array.isArray(result.subwallets)).toBe(true);
        
        
      }, 30000);
    });

    describe('createVirtualAccount', () => {
      it('should create virtual account for user', async () => {
        if (!requireApiKey()) return;
  
        // Act
        const result = await walletService.createVirtualAccount({

          nin: "11059990530",        

        });
        
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        console.log('virtual account:', {
          statusCode: result.statusCode,
          message: result.message,
          data: result.data
        });
      }, 30000);
    });

});
