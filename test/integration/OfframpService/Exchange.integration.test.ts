import { describe, it, expect, beforeAll } from '@jest/globals';
import { OfframpExchangeService } from '../../../src/services/offramp/exchange.service';
import { MoneiClient } from '../../../src/client/MoneiClient';
import { requireApiKey, createTestClient } from '../../utils/test-setup'; 
import { OfframpQuoteRequestDto, SwapCryptoToFiatRequestDto } from '../../../src/types';
import { OfframpAssets, OfframpCurrency, OfframpNetworks, OfframpStatus } from '../../../src/types/enums/offramp.enum';

describe('OfframpExchangeService Integration Tests', () => {
  let offrampService: OfframpExchangeService;
  let client: MoneiClient;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    client = createTestClient();
    offrampService = new OfframpExchangeService(client);
  });

  describe('getAssets', () => {
    it('should get available offramp assets', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await offrampService.getAssets();
      //console.log('Retrieved assets:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      
      // Check structure of assets if available
      if (result.data.length > 0) {
        const firstAsset = result.data[0];
        expect(firstAsset).toHaveProperty('name');
        expect(firstAsset).toHaveProperty('symbol');
        expect(firstAsset).toHaveProperty('networks');
        expect(Array.isArray(firstAsset.networks)).toBe(true);
      }

      console.log('Available assets count:', result.data.length);
      console.log('Supported assets:', result.data.map((asset: any) => ({
        asset: asset.name,
        networks: asset.networks,
      })));
    }, 30000);
  });

  describe('getCryptoToFiatQuote', () => {
    it('should get quote for USDT to NGN', async () => {
      if (!requireApiKey()) return;

      const quoteRequest: OfframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ethereum,
        amount: 100,
        fiat: OfframpCurrency.NGN
      };

      // Act
      const result = await offrampService.getQuote(quoteRequest);
      console.log('USDT to NGN quote:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
    }, 30000);

   
  });

  describe('initiate', () => {
    let quoteResult: any;

    beforeAll(async () => {
      // Get a quote first to use for initiation
      if (!requireApiKey()) return;

      const quoteRequest: OfframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ethereum,
        amount: 100,
        fiat: OfframpCurrency.NGN
      };

      quoteResult = await offrampService.getQuote(quoteRequest);
    });

    it('should initiate offramp exchange with valid bank details', async () => {
      if (!requireApiKey() || !quoteResult) return;

      // Arrange
      const initiateRequest: SwapCryptoToFiatRequestDto = {
        amount: 100,
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ethereum,
        fiatCurrency: OfframpCurrency.NGN,
        bankCode: 'GTBINGLA',
        accountNumber: '0123456789',
        accountName: 'John Doe'
      };

      // Act
      const result = await offrampService.initiateSwap(initiateRequest);
      console.log('Initiate offramp response:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect([200, 201]).toContain(result.statusCode);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      // Check order data structure
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('reference');
      expect(result.data).toHaveProperty('status');
      expect(result.data).toHaveProperty('amounts');
      expect(result.data.amounts).toHaveProperty('crypto');
      expect(result.data.amounts).toHaveProperty('fiat');
      expect(result.data.amounts).toHaveProperty('exchangeRate');
      expect(result.data.amounts).toHaveProperty('totalFee');
      expect(result.data).toHaveProperty('beneficiary');
      expect(result.data.beneficiary).toHaveProperty('bankCode');
      expect(result.data.beneficiary).toHaveProperty('bankName');
      expect(result.data.beneficiary).toHaveProperty('accountNumber');
      expect(result.data.beneficiary).toHaveProperty('accountName');
      expect(result.data).toHaveProperty('onChain');
      expect(result.data.onChain).toHaveProperty('depositAddress');
      expect(result.data.onChain).toHaveProperty('txHash');
      expect(result.data.onChain).toHaveProperty('sourceWallet');
      expect(result.data).toHaveProperty('timestamps');
      expect(result.data.timestamps).toHaveProperty('created');
      expect(result.data.timestamps).toHaveProperty('updated');
      expect(result.data.timestamps).toHaveProperty('depositExpires');

      console.log('Initiated offramp order:', {
        orderId: result.data.id,
        reference: result.data.reference,
        status: result.data.status,
        depositAddress: result.data.onChain.depositAddress,
        expiresAt: result.data.timestamps.depositExpires,
        cryptoAmount: result.data.amounts.crypto.value,
        fiatAmount: result.data.amounts.fiat.value,
        exchangeRate: result.data.amounts.exchangeRate,
        totalFee: result.data.amounts.totalFee
      });
    }, 30000);


    it('should initiate offramp exchange for USDC', async () => {
      if (!requireApiKey()) return;

      // Arrange - get quote for USDC first
      const quoteRequest: OfframpQuoteRequestDto = {
        token: OfframpAssets.USDC,
        network: OfframpNetworks.base,
        amount: 200,
        fiat: OfframpCurrency.NGN
      };

      const usdcQuote = await offrampService.getQuote(quoteRequest);

      const initiateRequest: SwapCryptoToFiatRequestDto = {
        amount: Number(usdcQuote.data),
        token: OfframpAssets.USDC,
        network: OfframpNetworks.base,
        fiatCurrency: OfframpCurrency.NGN,
        bankCode: 'GTBINGLA',
        accountNumber: '1122334455',
        accountName: 'Bob Johnson'
      };

      // Act
      const result = await offrampService.initiateSwap(initiateRequest);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect([200, 201]).toContain(result.statusCode);
      expect(result.data.amounts.crypto.asset).toBe(OfframpAssets.USDC);
      
      console.log('USDC offramp order:', {
        asset: result.data.amounts.crypto.asset,
        cryptoAmount: result.data.amounts.crypto.value,
        fiatAmount: result.data.amounts.fiat.value,
        exchangeRate: result.data.amounts.exchangeRate
      });
    }, 30000);
  });

});