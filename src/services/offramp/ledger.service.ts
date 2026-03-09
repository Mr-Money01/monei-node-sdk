import { MoneiClient } from '../../client/MoneiClient';
import {
    OfframpHistoryRequestDto,OfframpStatusRequestDto, OfframpTransactionListResponseDto, OfframpTransactionDetailResponseDto} from '../../types';

export class OfframpLedgerService {
  constructor(private client: MoneiClient) {}


  async getTransactions(requestData: OfframpHistoryRequestDto): Promise<OfframpTransactionListResponseDto> {
    let url = `/api/v1/offramp/ledger/history`;

    requestData.limit ? url+= `?limit=${requestData.limit}` : url+= `?limit=10`;

    if (requestData.page) url += `&page=${requestData.page}`;
    
    return this.client.get<OfframpTransactionListResponseDto>(url);
  }

  async trackOrder(reference: OfframpStatusRequestDto): Promise<OfframpTransactionDetailResponseDto> {
    return this.client.get<OfframpTransactionDetailResponseDto>(`/api/v1/offramp/ledger/status/${reference}`);
  }

}