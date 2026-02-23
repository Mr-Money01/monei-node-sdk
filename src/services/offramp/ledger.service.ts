import { MoneiClient } from '../../client/MoneiClient';
import {
    OfframpHistoryRequestDto,OfframpHistoryResponseDto,OfframpStatusResponseDto,OfframpStatusRequestDto
  
} from '../../types';

export class OfframpLedgerService {
  constructor(private client: MoneiClient) {}


  async getOfframpHistory(requestData:OfframpHistoryRequestDto ): Promise<OfframpHistoryResponseDto> {
    return this.client.post<OfframpHistoryResponseDto>('/api/v1/offramp/ledger/history', requestData);
  }

  async getOfframpStatus(reference: OfframpStatusRequestDto): Promise<OfframpStatusResponseDto> {
    return this.client.post<OfframpStatusResponseDto>(`/api/v1/offramp/ledger/status/${reference}`);
  }

 

 
}