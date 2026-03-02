import { MoneiClient } from '../../client/MoneiClient';
import {
  SwapCryptoToFiatRequestDto,OfframpOrderResponseDto,AssetsResponseDto,OfframpQuoteRequestDto,OfframpQuoteResponseDto } from '../../types';

export class OfframpExchangeService {
  constructor(private client: MoneiClient) {}


  async getAssets(): Promise<AssetsResponseDto> {
    return this.client.post<AssetsResponseDto>('/api/v1/offramp/exchange/assets');
  }

  async getQuote(data: OfframpQuoteRequestDto): Promise<OfframpQuoteResponseDto> {
    return this.client.post<OfframpQuoteResponseDto>('/api/v1/offramp/exchange/quote', data);
  }

  async initiateSwap(initiateData:SwapCryptoToFiatRequestDto): Promise<OfframpOrderResponseDto> {
    return this.client.post<OfframpOrderResponseDto>('/api/v1/offramp/exchange/initiate', initiateData);
  }

 
}