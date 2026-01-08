import { MoneiClient } from '../../src/client/MoneiClient';
import { UserService } from '../../src/services/UserService';
import { WalletService } from '../../src/services/WalletService';
import { EvmService } from '../../src/services/EvmService';
import { SolanaService } from '../../src/services/SolanaService';
import { BillService } from '../../src/services/BillService';
import { ExchangeService } from '../../src/services/ExchangeService';
import { MoneiConfig } from '../../src/types';
import { TransactionService } from '../../src/services/TransactionService';
import { BillerDto, ElectricityCodesDto } from '../../src/types';   
import dotenv from 'dotenv';
dotenv.config();



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

export function isBillerDto(
  item: unknown
): item is BillerDto {
  if (typeof item !== 'object' || item === null) return false;

  const obj = item as Record<string, unknown>;

  return (
    typeof obj.id === 'number' &&
    typeof obj.biller_code === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.default_commission === 'number' &&
    typeof obj.country === 'string' &&
    typeof obj.is_airtime === 'boolean' &&
    typeof obj.item_code === 'string' &&
    typeof obj.short_name === 'string' &&
    typeof obj.fee === 'number' &&
    typeof obj.commission_on_fee === 'boolean' &&
    typeof obj.reg_expression === 'string' &&
    typeof obj.label_name === 'string' &&
    typeof obj.amount === 'number' &&
    typeof obj.is_resolvable === 'boolean' &&
    typeof obj.group_name === 'string' &&
    typeof obj.category_name === 'string' &&
    typeof obj.default_commission_on_amount === 'number' &&
    typeof obj.commission_on_fee_or_amount === 'number' &&
    (
      obj.is_data === null ||
      typeof obj.is_data === 'boolean' ||
      typeof obj.is_data === 'undefined'
    ) &&
    (
      obj.validity_period === null ||
      typeof obj.validity_period === 'string' ||
      typeof obj.validity_period === 'undefined'
    )
  );
}

export function isElectricityCodesDto(
  item: unknown
): item is ElectricityCodesDto {
  if (typeof item !== 'object' || item === null) return false;

  const obj = item as Record<string, unknown>;

  return (
    typeof obj.name === 'string' &&
    typeof obj.code === 'string' &&
    typeof obj.billerCode === 'string'
  );
}




// Helper to skip tests if no API key is set
export const requireApiKey = () => {
  if (!process.env.MONEI_API_KEY) {
    console.warn('MONEI_API_KEY not set. Skipping integration tests.');
    return false;
  }
  return true;
};