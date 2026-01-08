import { describe, it, expect, beforeAll } from '@jest/globals';
import { EvmService } from '../../src/services/EvmService';
import { createTestEvmService, requireApiKey } from '../utils/test-setup';
import { UserEvmPortfolioResponseDto, UserEvmPortfolioDto, SendNativeTokenDto, SendTokenDto, SendTokenResponseDto, SendNativeTokenResponseDto, UserTokenBalanceDto } from '../../src/types';

describe('EvmService Integration Tests', () => {
  let evmService: EvmService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    evmService = createTestEvmService();
  });

  // ---------------------------------------------------------
  // PORTFOLIO
  // ---------------------------------------------------------
  describe('getPortfolio', () => {
    it('should return user EVM portfolio', async () => {
      if (!requireApiKey()) return;

      const chainId = 56; // BSC Mainnet 

      // Act
      const result: UserEvmPortfolioResponseDto = await evmService.getPortfolio(chainId);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const p: UserEvmPortfolioDto = result.data;

      // Validate structure
      //expect(Array.isArray((result.data as any).assets)).toBe(true);

      console.log('EVM Portfolio Data:', p);

      // === ASSERT ROOT PORTFOLIO FIELDS ===
      expect(p).toHaveProperty('userId');
      expect(p).toHaveProperty('walletAddress');
      expect(p).toHaveProperty('network');
      expect(p).toHaveProperty('totalPortfolioValueUSD');
      expect(p).toHaveProperty('updatedAt');

      // === ASSERT NATIVE TOKEN ===
      //expect(p.nativeToken).toHaveProperty('contractAddress');
      expect(p.nativeToken).toHaveProperty('name');
      expect(p.nativeToken).toHaveProperty('symbol');
      expect(p.nativeToken).toHaveProperty('decimals');
      expect(p.nativeToken).toHaveProperty('logoUrl');
      //expect(p.nativeToken).toHaveProperty('type');
      expect(p.nativeToken).toHaveProperty('balance');
      expect(p.nativeToken).toHaveProperty('balanceUSD');
      expect(p.nativeToken).toHaveProperty('priceUSD');
      expect(p.nativeToken).toHaveProperty('rawBalance');
      expect(p.nativeToken).toHaveProperty('network');

      // === ASSERT TOKENS ARRAY ===
      expect(Array.isArray(p.tokens)).toBe(true);

      if (p.tokens.length > 0) {

        p.tokens.forEach((t: UserTokenBalanceDto) => {
          expect(t).toMatchObject({
            contractAddress: expect.any(String),
            name: expect.any(String),
            symbol: expect.any(String),
            decimals: expect.any(Number),
            logoUrl: expect.any(String),
            type: expect.any(String),
            balance: expect.any(String),
            balanceUSD: expect.any(String),
            priceUSD: expect.any(String),
            rawBalance: expect.any(String),
            network: expect.any(String),
          });
        });

        console.log(`Found ${p.tokens.length} tokens in portfolio.`);
        console.log(`checking first token:`, p.tokens[0]);
      }


      // === LOG USEFUL OUTPUT ===
      console.log('EVM Portfolio Summary:', {
        wallet: p.walletAddress,
        totalValueUSD: p.totalPortfolioValueUSD,
        nativeBalance: p.nativeToken.balance,
        tokenCount: p.tokens.length
      });
    });
  });

  // ---------------------------------------------------------
  // NATIVE BALANCE
  // ---------------------------------------------------------
  describe('getNativeBalance', () => {

    it('should get native balance for Ethereum mainnet', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const chainId = 56; // Ethereum mainnet

      // Act
      const result = await evmService.getNativeBalance(chainId);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');


      expect(result.data).toHaveProperty('balance');

      console.log('Native Balance:', result.data.balance);
    }, 30000);

    it('should get native balance for different chains', async () => {
      if (!requireApiKey()) return;

      const testChains = [
        { chainId: 56, name: 'BSC' },
        { chainId: 137, name: 'Polygon' },
      ];

      for (const { chainId, name } of testChains) {
        const result = await evmService.getNativeBalance(chainId);
        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('balance');
        console.log(`Native balance on ${name}:`, result.data.balance);
      }
    }, 45000);
  });

  // ---------------------------------------------------------
  // TOKEN BALANCE
  // ---------------------------------------------------------
  describe('getTokenBalance', () => {
    it('should return token balance for a given token', async () => {
      if (!requireApiKey()) return;

      const chainId = 56; // Bsc Mainnet
      const tokenAddress = '0x55d398326f99059fF775485246999027B3197955';

      const result = await evmService.getTokenBalance(tokenAddress, chainId);

      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('balance');

      console.log('Token Balance:', result.data.balance);
    }, 30000);
  });

  // ---------------------------------------------------------
  // SEND NATIVE TOKEN
  // ---------------------------------------------------------

  describe('sendNativeToken', () => {
    it('should attempt a real native token transfer (test wallet required)', async () => {
      if (!requireApiKey()) return;

      const sendData: SendNativeTokenDto = {
        to: process.env.TEST_EVM_RECEIVER!,
        amount: '0.001',
        chainId: 56
      };

      const result: SendNativeTokenResponseDto = await evmService.sendNativeToken(sendData);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('txHash');

      console.log('Native Token Sent, TX:', result.data.txHash);
    }, 30000);
  });


  // ---------------------------------------------------------//
  // SEND TOKEN
  // ---------------------------------------------------------//
  describe('sendToken', () => {
    it('should attempt a token transfer (requires funded wallet + allowance)', async () => {
      if (!requireApiKey()) return;

      const tokenAddress = '0x55d398326f99059fF775485246999027B3197955';

      const sendData: SendTokenDto = {
        to: process.env.TEST_EVM_RECEIVER!,
        amount: '0.12',
        tokenAddress: tokenAddress,
        chainId: 56
      };

      const result: SendTokenResponseDto = await evmService.sendToken(sendData);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('txHash');

      console.log('Token Sent, TX:', result.data.txHash);
    }, 30000);
  });

  


});



