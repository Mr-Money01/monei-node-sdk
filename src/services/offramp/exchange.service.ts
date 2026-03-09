import { MoneiClient } from '../../client/MoneiClient';
import {
  SwapCryptoToFiatRequestDto,OfframpOrderResponseDto,OfframpAssetsResponseDto,OfframpQuoteRequestDto,OfframpQuoteResponseDto } from '../../types';

export class OfframpExchangeService {
  constructor(private client: MoneiClient) {}


  async getAssets(): Promise<OfframpAssetsResponseDto> {
    return this.client.get<OfframpAssetsResponseDto>('/api/v1/offramp/exchange/assets');
  }

  async getQuote(data: OfframpQuoteRequestDto): Promise<OfframpQuoteResponseDto> {
    return this.client.get<OfframpQuoteResponseDto>(`/api/v1/offramp/exchange/quote?token=${data.token}&network=${data.network}&amount=${data.amount}&fiat=${data.fiat}`);
  }

  async initiateSwap(initiateData: SwapCryptoToFiatRequestDto): Promise<OfframpOrderResponseDto> {
    return this.client.post<OfframpOrderResponseDto>('/api/v1/offramp/exchange/initiate', initiateData);
  }

 
}