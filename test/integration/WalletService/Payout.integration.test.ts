import { describe, it, expect, beforeAll } from '@jest/globals';
import { createTestWalletAccount, createTestWalletPayout, requireApiKey } from '../../utils/test-setup';
import {
  FundWalletByNairaDto,
  VerifyBankAccountRequestDto,
  VerifyBvnDto,
  WithdrawWalletDto
} from '../../../src/types';
import { WalletServicePayouts } from '../../../src/services/wallet-services/WalletService.Payouts';

describe('WalletServiceAccount Integration Tests', () => {
  let walletService: WalletServicePayouts;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    walletService = createTestWalletPayout();
  });

  describe('withdrawFromWallet', () => {
    it('should send money to a bank account', async () => {
      if (!requireApiKey()) return;

      const withdrawData: WithdrawWalletDto = {
        amount: 100,
        bank: "100004",
        accountNumber: "7032887129",
        transactionPin: "0990",
        currency: "NGN",
        reference: "5434532fgdsgdsgkds65365326532",
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

  describe('transferP2P', () => {
    it('should transfer money to another user', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await walletService.peerTransfer({
        receiver: "tobentra32@gmail.com",
        amount: 100,
        transactionPin: "2584",
        currency: "NGN"
      });
      console.log('Retrieved wallet:', result);

      // Assert

    }, 30000);
  });

});


