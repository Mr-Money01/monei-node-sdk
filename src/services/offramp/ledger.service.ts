import { MoneiClient } from '../../client/MoneiClient';
import {
    OfframpHistoryRequestDto,OfframpStatusRequestDto, OfframpTransactionListResponseDto, OfframpTransactionDetailResponseDto} from '../../types';

export class OfframpLedgerService {
  constructor(private client: MoneiClient) {}


  async getTransactions(requestData:OfframpHistoryRequestDto ): Promise<OfframpTransactionListResponseDto> {
    return this.client.post<OfframpTransactionListResponseDto>('/api/v1/offramp/ledger/history', requestData);
  }

  async trackOrder(reference: OfframpStatusRequestDto): Promise<OfframpTransactionDetailResponseDto> {
    return this.client.post<OfframpTransactionDetailResponseDto>(`/api/v1/offramp/ledger/status/${reference}`);
  }

}