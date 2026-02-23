import { MoneiClient } from '../../src/client/MoneiClient';
import { UserService } from '../../src/services/UserService';
import { WalletAccountService } from '../../src/services/wallet/WalletAccount.service';
import { PayoutService } from '../../src/services/wallet/payout.service';
import { DepositService } from '../../src/services/wallet/deposit.service';
import { WalletUtilityService } from '../../src/services/wallet/WalletUtility.service';
import { EvmService } from '../../src/services/EvmService';
import { SolanaService } from '../../src/services/SolanaService';
import { BillService } from '../../src/services/BillService';
import { ExchangeService } from '../../src/services/ExchangeService';
import { MoneiConfig } from '../../src/types';
import { TransactionService } from '../../src/services/TransactionService';   
import dotenv from 'dotenv';
import { PaymentMethodService } from '../../src/services/PaymentMethodService';
dotenv.config();



export const createTestClient = (): MoneiClient => {
  const config: MoneiConfig = {
    apiKey: process.env.MONEI_API_KEY2!,
    baseUrl: process.env.MONEI_BASE_URL || 'https://api.monei.cc',
    timeout: 30000,
  };

  return new MoneiClient(config);
};

export const createTestUserService = (): UserService => {
  const client = createTestClient();
  return new UserService(client);
};

export const createTestWalletAccount = (): WalletAccountService => {
  const client = createTestClient();
  return new WalletAccountService(client);
};

export const createTestWalletUtility = (): WalletUtilityService => {
  const client = createTestClient();
  return new WalletUtilityService(client);
};

export const createTestWalletPayout = (): PayoutService => {
  const client = createTestClient();
  return new PayoutService(client);
};

export const createPaymentMethodService = (): PaymentMethodService => {
  const client = createTestClient();
  return new PaymentMethodService(client);
}

export const createTestWalletDeposit = (): DepositService => {
  const client = createTestClient();
  return new DepositService(client);
};

export const createTestEvmService = (): EvmService => {
  const client = createTestClient();
  return new EvmService(client);
};

export const createTestSolanaService = (): SolanaService => {
  const client = createTestClient();
  return new SolanaService(client);
};

export const createTestBillService = (): BillService => {
  const client = createTestClient();
  return new BillService(client);
};

export const createTestExchangeService = (): ExchangeService => {
  const client = createTestClient();
  return new ExchangeService(client);
};

export const createTestTransactionService = (): TransactionService => {
  const client = createTestClient();
  return new TransactionService(client);
};



// Helper to skip tests if no API key is set
export const requireApiKey = () => {
  if (!process.env.MONEI_API_KEY2) {
    console.warn('MONEI_API_KEY not set. Skipping integration tests.');
    return false;
  }
  return true;
};