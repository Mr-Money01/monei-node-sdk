import { describe, it, expect, beforeAll } from '@jest/globals';
import { ExchangeService } from '../../src/services/ExchangeService';
import { createTestExchangeService, requireApiKey } from '../utils/test-setup';
import {
  SwapNativeToTokenDto,
  PriceResponseDto,
  TxHashResponseDto,
  SwapTokenToTokenDto,
  SwapTokenToNativeDto,
  SwapSolToTokenDto,
  SwapResponseDto,
  ZeroExQuoteDto
} from '../../src/types';


describe('ExchangeService Integration Tests', () => {
  ``
  let exchangeService: ExchangeService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    exchangeService = createTestExchangeService();
  });

  // -------------------------------
  // EVM: getNativeToTokenPrice
  // -------------------------------
  it('should retrieve a valid native to token price', async () => {
    if (!requireApiKey()) return;

    const payload: SwapNativeToTokenDto = {
      chainId: 56,
      amount: '0.1',
      tokenOut: '0x55d398326f99059fF775485246999027B3197955'
    };

    const response: PriceResponseDto = await exchangeService.getNativeToTokenPrice(payload);
    //console.log('Quote response:', response);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    const data: ZeroExQuoteDto = response.data;
    //console.log('Quote data:', data);

  }, 30000);

  // -------------------------------
  // EVM: getTokenToNativePrice
  // -------------------------------
  it('should get a token-to-native price', async () => {
    if (!requireApiKey()) return;

    const payload: SwapTokenToNativeDto = {
      chainId: 1,
      tokenIn: '0xfb5B838b6cfEEdC2873aB27866079AC55363D37E',
      amount: '300000000000000000',

    };

    const response: PriceResponseDto = await exchangeService.getTokenToNativePrice(payload);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    //const data: ZeroExQuoteDto = response.data;


    //console.log('Quote data:', data);

  }, 30000);


  // -------------------------------
  // EVM: getTokenToTokenPrice
  // -------------------------------
  it('should get a token-to-token price', async () => {
    if (!requireApiKey()) return;

    const payload: SwapTokenToTokenDto = {
      //chainId: 56,
      inputMint: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      outputMint: '0xcf0c122c6b73ff809c693db761e7baebe62b6a2e',
      amount: 0.2,
      slippageBps: 56
    };

    const response: PriceResponseDto = await exchangeService.getTokenToTokenPrice(payload);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    const data: ZeroExQuoteDto = response.data;


    console.log('Quote data:', data);

  }, 30000);

  



  // --------------------------------------------------
  // SOLANA: getSolanaQuote
  // --------------------------------------------------
  it('should get a Solana quote', async () => {
    if (!requireApiKey()) return;

    const response = await exchangeService.getSolanaQuote(
      'So11111111111111111111111111111111111111112', // SOL
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      10000000 // 0.01 SOL
    );

    console.log('Solana Quote Response:', response);

    //expect(response).toHaveProperty('statusCode');
    //expect(response.statusCode).toBe(200);


  }, 30000);

  // --------------------------------------------------
  // SOLANA: swapSolToToken
  // --------------------------------------------------
  it('should swap SOL to token', async () => {
    if (!requireApiKey()) return;

    const payload: SwapSolToTokenDto = {
      outputMint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      amount: 10000000, // 0.01 SOL
      slippageBps: 50
    };

    const response: SwapResponseDto = await exchangeService.swapSolToToken(payload);

    console.log('Swap Response:', response);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    expect(response.data).toHaveProperty('txUrl');
    expect(response.data).toHaveProperty('signature');

    console.log('Swap Transaction Hash:', response.data.signature);
    // === LOG SUCCESS ===
    console.log('Swap Transaction:', {

      txUrl: response.data.txUrl,
      signature: response.data.signature
    }, 30000);


  });

  // --------------------------------------------------
  // SOLANA: swapTokenToSol
  // --------------------------------------------------
  it('should swap token to SOL', async () => {
    if (!requireApiKey()) return;

    const payload: SwapTokenToTokenDto = {
      inputMint: 'So11111111111111111111111111111111111111112',
      outputMint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      amount: 1000000
    };

    const response: SwapResponseDto = await exchangeService.swapTokenToSol(payload);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    expect(response.data).toHaveProperty('txUrl');
    expect(response.data).toHaveProperty('signature');

    console.log('Swap Transaction Hash:', response.data.signature);
    // === LOG SUCCESS ===
    console.log('Swap Transaction:', {

      txUrl: response.data.txUrl,
      signature: response.data.signature
    });
  });

  // --------------------------------------------------
  // SOLANA: swapTokenToToken
  // --------------------------------------------------
  it('should swap token to token on Solana', async () => {
    if (!requireApiKey()) return;

    const payload: SwapTokenToTokenDto = {
      inputMint: 'TokenMintAddressA',
      outputMint: 'TokenMintAddressB',
      amount: 1000000
    };

    const response: SwapResponseDto = await exchangeService.swapTokenToTokenSolana(payload);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    expect(response.data).toHaveProperty('txUrl');
    expect(response.data).toHaveProperty('signature');

    // === LOG SUCCESS ===
    console.log('Swap Transaction:', {
      txUrl: response.data.txUrl,
      signature: response.data.signature
    });
  });






});
