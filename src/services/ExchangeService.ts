import { MoneiClient } from '../client/MoneiClient';
import {
  SwapNativeToTokenDto,
  SwapTokenToTokenDto,
  SwapTokenToNativeDto,
  PriceResponseDto,
  TxHashResponseDto,
  SwapSolToTokenDto,
  SwapResponseDto,
  SwapTokenToSolDto,
  EvmTokenToTokenDto
} from '../types';

export class ExchangeService {
  constructor(private client: MoneiClient) {}

  // EVM Exchange
  async getNativeToTokenPrice(quoteData: SwapNativeToTokenDto): Promise<PriceResponseDto> {
    return this.client.post<PriceResponseDto>('/api/v1/evm-exchange/price/native-to-token', quoteData);
  }

  async swapNativeToToken(swapData: SwapNativeToTokenDto): Promise<TxHashResponseDto> {
    return this.client.post<TxHashResponseDto>('/api/v1/evm-exchange/native-to-token', swapData);
  }

  async getTokenToTokenPrice(quoteData: EvmTokenToTokenDto): Promise<PriceResponseDto> {
    return this.client.post<PriceResponseDto>('/api/v1/evm-exchange/price/token-to-token', quoteData);
  }

  async swapTokenToToken(swapData: EvmTokenToTokenDto): Promise<TxHashResponseDto> {
    return this.client.post<TxHashResponseDto>('/api/v1/evm-exchange/token-to-token', swapData);
  }

  async getTokenToNativePrice(quoteData: SwapTokenToNativeDto): Promise<PriceResponseDto> {
    return this.client.post<PriceResponseDto>('/api/v1/evm-exchange/price/token-to-native', quoteData);
  }

  async swapTokenToNative(swapData: SwapTokenToNativeDto): Promise<TxHashResponseDto> {
    return this.client.post<TxHashResponseDto>('/api/v1/evm-exchange/token-to-native', swapData);
  }

  // Solana Exchange
  async getSolanaToTokenQuote(quoteData: SwapSolToTokenDto): Promise<any> {
    return this.client.get('/api/v1/solana-exchange/quote/sol-to-token', { params: quoteData });
  }

  async getTokenToSolanaQuote(quoteData: SwapTokenToSolDto): Promise<any> {
    return this.client.get('/api/v1/solana-exchange/quote/token-to-sol', { params: quoteData });  
  }

  async getTokenToTokenQuote(quoteData: SwapTokenToTokenDto): Promise<any> {
    return this.client.get('/api/v1/solana-exchange/quote/token-to-token', { params: quoteData });
  }

  async swapSolToToken(swapData: SwapSolToTokenDto): Promise<SwapResponseDto> {
    return this.client.post<SwapResponseDto>('/api/v1/solana-exchange/swap-sol-to-token', swapData);
  }

  async swapTokenToTokenSolana(swapData: SwapTokenToTokenDto): Promise<SwapResponseDto> {
    return this.client.post<SwapResponseDto>('/api/v1/solana-exchange/swap-token-to-token', swapData);
  }

  async swapTokenToSol(swapData: SwapTokenToSolDto): Promise<SwapResponseDto> {
    return this.client.post<SwapResponseDto>('/api/v1/solana-exchange/swap-token-to-sol', swapData);
  }
}