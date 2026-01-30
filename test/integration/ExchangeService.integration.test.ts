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
  SwapDto,
  SwapTokenToSolDto,
  SwapResponseDto,
  ZeroExQuoteDto
} from '../../src/types';


describe('ExchangeService Integration Tests', () => {
  ``
  let exchangeService: ExchangeService;
  let usdc_address: string;
  let usdt_address: string;
  let sol_usdt: string;
  let sol_usdc: string;

  beforeAll(() => {
    if (!requireApiKey()) return;
    exchangeService = createTestExchangeService();
    usdc_address = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d';
    usdt_address = '0x55d398326f99059ff775485246999027b3197955';
    sol_usdc = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    sol_usdt = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
  });

  // -------------------------------
  // EVM: getNativeToTokenPrice
  // -------------------------------
  it('should retrieve a valid native to token price', async () => {
    if (!requireApiKey()) return;

    const payload: SwapNativeToTokenDto = {
      chainId: 56,
      amount: '0.1',
      tokenOut: usdc_address
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
      tokenIn: usdt_address,
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

  // -------------------------------
  // EVM: swapNativeToToken
  // -------------------------------
  it('should swap native to token', async () => {
    if (!requireApiKey()) return;

    const payload: SwapNativeToTokenDto = {
      chainId: 56,
      amount: '0.0001',
      tokenOut: usdc_address
    };

    const response: TxHashResponseDto = await exchangeService.swapNativeToToken(payload);
    console.log('response:', response);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    //const data: ZeroExQuoteDto = response.data;
    //console.log('Quote data:', data);

  }, 30000);

  // -------------------------------
  // EVM: swapTokenToNative
  // -------------------------------
  it('should swap a token-to-native ', async () => {
    if (!requireApiKey()) return;

    const payload: SwapTokenToNativeDto = {
      chainId: 1,
      tokenIn: usdt_address,
      amount: '300000000000000000',

    };

    const response: TxHashResponseDto = await exchangeService.swapTokenToNative(payload);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    console.log('response:', response);

    //const data: ZeroExQuoteDto = response.data;


    //console.log('Quote data:', data);

  }, 30000);


  // -------------------------------
  // EVM: swapTokenToToken
  // -------------------------------
  it('should swap a token-to-token', async () => {
    if (!requireApiKey()) return;

    const payload: SwapTokenToTokenDto = {
      //chainId: 56,
      inputMint: usdc_address,
      outputMint: usdt_address,
      amount: 0.0001,
      slippageBps: 56
    };

    const response: TxHashResponseDto = await exchangeService.swapTokenToToken(payload);

    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    console.log('response:', response);

  }, 30000);


  // --------------------------------------------------
  // SOLANA: getSolanaToTokenQuote
  // --------------------------------------------------
  it('should get a Solana to token quote', async () => {
    if (!requireApiKey()) return;

    const response = await exchangeService.getSolanaToTokenQuote({
      outputMint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      amount: 10000000 // 0.01 SOL
    });
    console.log('Solana Quote Response:', response);

    //expect(response).toHaveProperty('statusCode');
    //expect(response.statusCode).toBe(200);


  }, 30000);

  // --------------------------------------------------
  // SOLANA: getTokenToSolanaQuote
  // --------------------------------------------------
  it('should get a token to Solana quote', async () => {
    if (!requireApiKey()) return;

    const response = await exchangeService.getTokenToSolanaQuote({
      inputMint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // SOL
      amount:  '0.000000000000000005' // 5e-25 SOL
    });
    console.log('Solana Quote Response:', response);

    //expect(response).toHaveProperty('statusCode');
    //expect(response.statusCode).toBe(200);


  }, 30000);

  // --------------------------------------------------
  // SOLANA: getTokenToTokenQuote
  // --------------------------------------------------
  it('should get a token to token quote', async () => {
    if (!requireApiKey()) return;

    const response = await exchangeService.getTokenToTokenQuote({
      inputMint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // SOL
      outputMint: 'So1111111111111111111111111111111111122222', // USDT
      amount:  0.000000000000000005 // 5e-25 SOL
    });
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
      outputMint: sol_usdc,
      amount: 10000000, // 0.01 SOL
     
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

    const payload: SwapTokenToSolDto = {
      inputMint: sol_usdc,
      amount: '0.0001'
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
      inputMint: sol_usdc,
      outputMint: sol_usdt,
      amount: 0.0001
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
