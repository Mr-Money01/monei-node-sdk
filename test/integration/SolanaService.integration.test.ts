import { describe, it, expect, beforeAll } from '@jest/globals';
import { SolanaService } from '../../src/services/SolanaService';
import { createTestSolanaService, requireApiKey } from '../utils/test-setup';
import { SolanaNetwork, TransferSolDto, TransferTokenDto, WalletAddressResponseDto, PortfolioResponseDto, PortfolioDto, TokenInfoDto, SignatureResponseDto } from '../../src/types';


describe('SolanaService Integration Tests', () => {
  let solanaService: SolanaService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    solanaService = createTestSolanaService();
  });

  // --------------------------------------------------------------------
  // GET WALLET ADDRESS
  // --------------------------------------------------------------------
  describe('getWalletAddress', () => {
    it('should return the actual Solana wallet address', async () => {
      if (!requireApiKey()) return;

      const result: WalletAddressResponseDto = await solanaService.getWalletAddress();

      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('address');

      console.log('Solana Wallet Address:', result.data.address);
    }, 30000);
  });

  // --------------------------------------------------------------------
  // GET NATIVE BALANCE
  // --------------------------------------------------------------------
  describe('getNativeBalance', () => {
    it('should return SOL balance', async () => {
      if (!requireApiKey()) return;

      const network: SolanaNetwork = 'mainnet-beta';

      const result = await solanaService.getNativeBalance(network);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('balance');

      console.log('SOL Balance:', result.data.balance);
    }, 30000);
  });

  // --------------------------------------------------------------------
  // GET TOKEN BALANCE
  // --------------------------------------------------------------------
  describe('getTokenBalance', () => {
    it('should return SPL token balance', async () => {
      if (!requireApiKey()) return;

      const tokenMintAddress =
        process.env.TEST_SOLANA_TOKEN_MINT ||
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'; 

      const network: SolanaNetwork = 'mainnet-beta';

      const result = await solanaService.getTokenBalance(tokenMintAddress, network);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('balance');

      console.log(`Token Balance (${tokenMintAddress}):`, result.data.balance);
    }, 30000);
  });

  // --------------------------------------------------------------------
  // GET PORTFOLIO
  // --------------------------------------------------------------------
  describe('getPortfolio', () => {
    it('should fetch actual Solana portfolio', async () => {
      if (!requireApiKey()) return;

      const network: SolanaNetwork = 'mainnet-beta';

      // Act
      const result: PortfolioResponseDto = await solanaService.getPortfolio(network);

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      //expect(Array.isArray((result.data as any).assets)).toBe(true);

      const p: PortfolioDto = result.data;

      // === PORTFOLIO DATA ===
      expect(p).toHaveProperty('userId');
      expect(p).toHaveProperty('address');
      expect(p).toHaveProperty('nativeBalance');
      expect(p).toHaveProperty('nativeBalanceLamports');
      //expect(p).toHaveProperty('nativeBalanceUsd');
      //expect(p).toHaveProperty('totalValueUsd');
      expect(p).toHaveProperty('tokens');

      // === VALIDATE NATIVE BALANCE TYPES ===
      expect(typeof p.nativeBalance).toBe('string');
      expect(typeof p.nativeBalanceLamports).toBe('string');
      //expect(typeof p.nativeBalanceUsd).toBe('number');
      //expect(typeof p.totalValueUsd).toBe('number');

      // === TOKENS ARRAY ===
      //expect(Array.isArray(p.tokens)).toBe(true);

      if (p.tokens.length > 0) {
        p.tokens.forEach((t: TokenInfoDto) => {
          expect(t).toMatchObject({
            mintAddress: expect.any(String),
            name: expect.any(String),
            symbol: expect.any(String),
            balance: expect.any(Number),
            rawBalance: expect.any(String),
            decimals: expect.any(Number),
            //priceUsd: expect.any(Number),
            //valueUsd: expect.any(Number),
          });

          console.log(
            'Sample Token Info:',
            t.decimals,
            t.symbol,
            t.balance,
            t.mintAddress,
            '($' + t.valueUsd + ')'
          );
        });
      }


      // === LOG FOR DEBUGGING ===
      console.log('Solana Portfolio Summary:', {
        address: p.address,
        solBalance: p.nativeBalance,
        usdValue: p.totalValueUsd,
        tokenCount: p.tokens.length
      });

    }, 30000);
  });

  // --------------------------------------------------------------------
  // SEND NATIVE TOKEN
  // --------------------------------------------------------------------

  describe.skip('sendNativeToken', () => {
    it('should attempt a real SOL transfer (requires funded test wallet)', async () => {
      if (!requireApiKey()) return;

      const transferData: TransferSolDto = {
        to: process.env.TEST_SOLANA_RECEIVER!,
        amount: '0.0001',
        network: 'mainnet-beta', // use devnet by default
      };

      const result = await solanaService.sendNativeToken(transferData);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('signature');

      console.log('SOL Transfer Signature:', result.data.signature);
    }, 30000);
  });
  

  // --------------------------------------------------------------------
  // SEND TOKEN
  // --------------------------------------------------------------------
  describe('sendToken', () => {
    it('should attempt an SPL token transfer (requires funded wallet + associated token accounts)', async () => {
      if (!requireApiKey()) return;

      const transferData: TransferTokenDto = {
        to: process.env.TEST_SOLANA_RECEIVER!,
        tokenMintAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        amount: '0.1',
        network: 'mainnet-beta', 
      };

      console.log('Transfer Data:', transferData);

      const result: SignatureResponseDto = await solanaService.sendToken(transferData);

      console.log('Transfer Result:', result);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('signature');

      console.log('Token Transfer Signature:', result.data.signature);
    }, 30000);
  });

  
});


