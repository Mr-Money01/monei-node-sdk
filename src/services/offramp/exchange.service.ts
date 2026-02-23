import { MoneiClient } from '../../client/MoneiClient';
import {
  InitiateResponseDto,AssetsResponseDto,OframpQuoteRequestDto,OframpQuoteResponseDto,InitiateRequestDto
} from '../../types';

export class OfframpExchangeService {
  constructor(private client: MoneiClient) {}


  async getAssets(): Promise<AssetsResponseDto> {
    return this.client.post<AssetsResponseDto>('/api/v1/offramp/exchange/assets');
  }

  async getCryptoToFiatQuote(data: OframpQuoteRequestDto): Promise<OframpQuoteResponseDto> {
    return this.client.post<OframpQuoteResponseDto>('/api/v1/offramp/exchange/quote', data);
  }

  async initiate(initiateData:InitiateRequestDto): Promise<InitiateResponseDto> {
    return this.client.post<InitiateResponseDto>('/api/v1/offramp/exchange/initiate', initiateData);
  }

 
}