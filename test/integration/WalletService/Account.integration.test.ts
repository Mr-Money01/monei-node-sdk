import { describe, it, expect, beforeAll } from '@jest/globals';
import { WalletAccountService} from '../../../src/services/wallet/WalletAccount.service';
import { createTestWalletAccount, requireApiKey } from '../../utils/test-setup';

describe('WalletServiceAccount Integration Tests', () => {
  let walletService: WalletAccountService;

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

          nin: "11059990539",        

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
