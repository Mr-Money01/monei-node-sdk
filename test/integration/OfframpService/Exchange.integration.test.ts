import { describe, it, expect, beforeAll } from '@jest/globals';
import { OfframpExchangeService } from '../../../src/services/offramp/OfframpExchange.service';
import { MoneiClient } from '../../../src/client/MoneiClient';
import { requireApiKey, createTestClient } from '../../utils/test-setup';
import {
  OframpQuoteRequestDto,
  InitiateRequestDto,
  OfframpAssets,
  OfframpNetworks,
  OfframpCurrency
} from '../../../src/types';

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
      console.log('Retrieved assets:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      
      // Check structure of assets if available
      if (result.data.length > 0) {
        const firstAsset = result.data[0];
        expect(firstAsset).toHaveProperty('asset');
        expect(firstAsset).toHaveProperty('networks');
        expect(Array.isArray(firstAsset.networks)).toBe(true);
        expect(firstAsset).toHaveProperty('minAmount');
        expect(firstAsset).toHaveProperty('maxAmount');
        expect(firstAsset).toHaveProperty('fiatCurrencies');
        expect(Array.isArray(firstAsset.fiatCurrencies)).toBe(true);
      }

      console.log('Available assets count:', result.data.length);
      console.log('Supported assets:', result.data.map((asset: any) => ({
        asset: asset.asset,
        networks: asset.networks,
        minAmount: asset.minAmount,
        maxAmount: asset.maxAmount,
        fiatCurrencies: asset.fiatCurrencies
      })));
    }, 30000);
  });

  describe('getCryptoToFiatQuote', () => {
    it('should get quote for USDT to NGN', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ETHEREUM,
        amount: '100',
        fiat: OfframpCurrency.NGN
      };

      // Act
      const result = await offrampService.getCryptoToFiatQuote(quoteRequest);
      console.log('USDT to NGN quote:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      // Check quote data structure
      expect(result.data).toHaveProperty('token');
      expect(result.data.token).toBe(OfframpAssets.USDT);
      expect(result.data).toHaveProperty('network');
      expect(result.data.network).toBe(OfframpNetworks.ETHEREUM);
      expect(result.data).toHaveProperty('amount');
      expect(result.data).toHaveProperty('fiat');
      expect(result.data.fiat).toBe(OfframpCurrency.NGN);
      expect(result.data).toHaveProperty('rate');
      expect(result.data.rate).toBeGreaterThan(0);

      console.log('Quote details:', {
        token: result.data.token,
        network: result.data.network,
        cryptoAmount: result.data.amount,
        fiatCurrency: result.data.fiat,
        exchangeRate: result.data.rate,
        estimatedFiatAmount: parseFloat(result.data.amount) * (result.data.rate || 0)
      });
    }, 30000);

    it('should get quote for USDC to USD', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDC,
        network: OfframpNetworks.POLYGON,
        amount: '500',
        fiat: OfframpCurrency.USD
      };

      // Act
      const result = await offrampService.getCryptoToFiatQuote(quoteRequest);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result.data.token).toBe(OfframpAssets.USDC);
      expect(result.data.network).toBe(OfframpNetworks.POLYGON);
      expect(result.data.fiat).toBe(OfframpCurrency.USD);
      expect(result.data.rate).toBeGreaterThan(0);

      console.log('USDC to USD quote:', {
        amount: result.data.amount,
        rate: result.data.rate,
        estimatedUSD: parseFloat(result.data.amount) * (result.data.rate || 0)
      });
    }, 30000);

    it('should get quote for BTC to EUR', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.BTC,
        network: OfframpNetworks.BITCOIN,
        amount: '0.01',
        fiat: OfframpCurrency.EUR
      };

      // Act
      const result = await offrampService.getCryptoToFiatQuote(quoteRequest);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result.data.token).toBe(OfframpAssets.BTC);
      expect(result.data.network).toBe(OfframpNetworks.BITCOIN);
      expect(result.data.fiat).toBe(OfframpCurrency.EUR);

      console.log('BTC to EUR quote:', {
        btcAmount: result.data.amount,
        rate: result.data.rate,
        estimatedEUR: parseFloat(result.data.amount) * (result.data.rate || 0)
      });
    }, 30000);

    it('should get quote without specifying fiat (should use default)', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.BSC,
        amount: '250'
        // fiat not provided - should use default
      };

      // Act
      const result = await offrampService.getCryptoToFiatQuote(quoteRequest);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result.data.fiat).toBeDefined(); // Should have default fiat

      console.log('Quote with default fiat:', {
        token: result.data.token,
        network: result.data.network,
        amount: result.data.amount,
        fiat: result.data.fiat,
        rate: result.data.rate
      });
    }, 30000);

    it('should handle different amounts for same token', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const amounts = ['100', '500', '1000'];
      const results = [];

      for (const amount of amounts) {
        const quoteRequest: OframpQuoteRequestDto = {
          token: OfframpAssets.USDT,
          network: OfframpNetworks.ETHEREUM,
          amount: amount,
          fiat: OfframpCurrency.NGN
        };

        // Act
        const result = await offrampService.getCryptoToFiatQuote(quoteRequest);
        results.push(result);

        console.log(`Quote for ${amount} USDT:`, {
          amount: result.data.amount,
          rate: result.data.rate,
          estimatedNGN: parseFloat(result.data.amount) * (result.data.rate || 0)
        });
      }

      // Assert - rates should be similar across different amounts
      const rates = results.map(r => r.data.rate);
      const uniqueRates = new Set(rates);
      
      // Rates might be identical or vary slightly
      console.log('Rate consistency across amounts:', rates);
      expect(uniqueRates.size).toBeLessThanOrEqual(2); // Should have 1 or 2 unique rates max
    }, 30000);
  });

  describe('initiate', () => {
    let quoteResult: any;

    beforeAll(async () => {
      // Get a quote first to use for initiation
      if (!requireApiKey()) return;

      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ETHEREUM,
        amount: '100',
        fiat: OfframpCurrency.NGN
      };

      quoteResult = await offrampService.getCryptoToFiatQuote(quoteRequest);
    });

    it('should initiate offramp exchange with valid bank details', async () => {
      if (!requireApiKey() || !quoteResult) return;

      // Arrange
      const initiateRequest: InitiateRequestDto = {
        amount: quoteResult.data.amount,
        token: quoteResult.data.token,
        network: quoteResult.data.network,
        fiatCurrency: quoteResult.data.fiat,
        bankCode: '058', // Example: GTBank code
        accountNumber: '0123456789',
        accountName: 'John Doe'
      };

      // Act
      const result = await offrampService.initiate(initiateRequest);
      console.log('Initiate offramp response:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
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
      expect(result.data).toHaveProperty('provider');
      expect(result.data).toHaveProperty('providerReference');
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
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDC,
        network: OfframpNetworks.POLYGON,
        amount: '200',
        fiat: OfframpCurrency.NGN
      };

      const usdcQuote = await offrampService.getCryptoToFiatQuote(quoteRequest);

      const initiateRequest: InitiateRequestDto = {
        amount: usdcQuote.data.amount,
        token: usdcQuote.data.token,
        network: usdcQuote.data.network,
        fiatCurrency: usdcQuote.data.fiat,
        bankCode: '058',
        accountNumber: '1122334455',
        accountName: 'Bob Johnson'
      };

      // Act
      const result = await offrampService.initiate(initiateRequest);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result.data.amounts.crypto.asset).toBe(OfframpAssets.USDC);
      
      console.log('USDC offramp order:', {
        asset: result.data.amounts.crypto.asset,
        cryptoAmount: result.data.amounts.crypto.value,
        fiatAmount: result.data.amounts.fiat.value,
        exchangeRate: result.data.amounts.exchangeRate
      });
    }, 30000);
  });

  describe('initiate validation tests', () => {
    it('should fail with invalid bank code', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ETHEREUM,
        amount: '100',
        fiat: OfframpCurrency.NGN
      };

      const quote = await offrampService.getCryptoToFiatQuote(quoteRequest);

      const initiateRequest: InitiateRequestDto = {
        amount: quote.data.amount,
        token: quote.data.token,
        network: quote.data.network,
        fiatCurrency: quote.data.fiat,
        bankCode: '999', // Invalid bank code
        accountNumber: '0123456789',
        accountName: 'John Doe'
      };

      try {
        // Act
        await offrampService.initiate(initiateRequest);
        // If it doesn't throw, fail the test
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for invalid bank code:', error.message);
      }
    }, 30000);

    it('should fail with invalid account number', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const quoteRequest: OframpQuoteRequestDto = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ETHEREUM,
        amount: '100',
        fiat: OfframpCurrency.NGN
      };

      const quote = await offrampService.getCryptoToFiatQuote(quoteRequest);

      const initiateRequest: InitiateRequestDto = {
        amount: quote.data.amount,
        token: quote.data.token,
        network: quote.data.network,
        fiatCurrency: quote.data.fiat,
        bankCode: '058',
        accountNumber: '123', // Too short
        accountName: 'John Doe'
      };

      try {
        // Act
        await offrampService.initiate(initiateRequest);
        // If it doesn't throw, fail the test
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for invalid account number:', error.message);
      }
    }, 30000);
  });

  
});