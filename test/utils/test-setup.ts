import { MoneiClient } from '../../src/client/MoneiClient';
import { UserService } from '../../src/services/UserService';
import { WalletService } from '../../src/services/WalletService';
import { MoneiConfig } from '../../src/types';

export const createTestClient = (): MoneiClient => {
  const config: MoneiConfig = {
    apiKey: process.env.MONEI_API_KEY!,
    baseUrl: process.env.MONEI_BASE_URL || 'https://api.monei.cc',
    timeout: 30000,
  };

  return new MoneiClient(config);
};

export const createTestUserService = (): UserService => {
  const client = createTestClient();
  return new UserService(client);
};

export const createTestWalletService = (): WalletService => {
  const client = createTestClient();
  return new WalletService(client);
};

// Helper to skip tests if no API key is set
export const requireApiKey = () => {
  if (!process.env.MONEI_API_KEY) {
    console.warn('MONEI_API_KEY not set. Skipping integration tests.');
    return false;
  }
  return true;
};