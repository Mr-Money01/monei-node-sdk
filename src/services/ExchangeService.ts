import { MoneiClient } from '../client/MoneiClient';
import {
  SwapNativeToTokenDto,
  SwapTokenToTokenDto,
  SwapTokenToNativeDto,
  QuoteResponseDto,
  TxHashResponseDto,
  SwapSolToTokenDto,
  SwapResponseDto
} from '../types';

export class ExchangeService {
  constructor(private client: MoneiClient) {}

  // EVM Exchange
  async getNativeToTokenQuote(quoteData: SwapNativeToTokenDto): Promise<QuoteResponseDto> {
    return this.client.post<QuoteResponseDto>('/api/v1/evm-exchange/quote/native-to-token', quoteData);
  }

  async swapNativeToToken(swapData: SwapNativeToTokenDto): Promise<TxHashResponseDto> {
    return this.client.post<TxHashResponseDto>('/api/v1/evm-exchange/native-to-token', swapData);
  }

  async getTokenToTokenQuote(quoteData: SwapTokenToTokenDto): Promise<QuoteResponseDto> {
    return this.client.post<QuoteResponseDto>('/api/v1/evm-exchange/quote/token-to-token', quoteData);
  }

  async swapTokenToToken(swapData: SwapTokenToTokenDto): Promise<TxHashResponseDto> {
    return this.client.post<TxHashResponseDto>('/api/v1/evm-exchange/token-to-token', swapData);
  }

  async getTokenToNativeQuote(quoteData: SwapTokenToNativeDto): Promise<QuoteResponseDto> {
    return this.client.post<QuoteResponseDto>('/api/v1/evm-exchange/quote/token-to-native', quoteData);
  }

  async swapTokenToNative(swapData: SwapTokenToNativeDto): Promise<TxHashResponseDto> {
    return this.client.post<TxHashResponseDto>('/api/v1/evm-exchange/token-to-native', swapData);
  }

  // Solana Exchange
  async getSolanaQuote(inputMint: string, outputMint: string, amount: number): Promise<any> {
    return this.client.get('/api/v1/solana-exchange/quote', {
      params: { inputMint, outputMint, amount }
    });
  }

  async swapSolToToken(swapData: SwapSolToTokenDto): Promise<SwapResponseDto> {
    return this.client.post<SwapResponseDto>('/api/v1/solana-exchange/swap-sol-to-token', swapData);
  }

  async swapTokenToTokenSolana(swapData: SwapTokenToTokenDto): Promise<SwapResponseDto> {
    return this.client.post<SwapResponseDto>('/api/v1/solana-exchange/swap-token-to-token', swapData);
  }

  async swapTokenToSol(swapData: SwapSolToTokenDto): Promise<SwapResponseDto> {
    return this.client.post<SwapResponseDto>('/api/v1/solana-exchange/swap-token-to-sol', swapData);
  }
}