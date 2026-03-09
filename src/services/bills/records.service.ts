import { MoneiClient } from '../../client/MoneiClient';
import {
  PaginatedBillResponseDto,
  BillResponseDto
} from '../../types';

export class BillRecordsService {
  constructor(private client: MoneiClient) {}


  async getBills(): Promise<PaginatedBillResponseDto> {
    return this.client.get<PaginatedBillResponseDto>('/api/v1/bills/records');
  }

  async getBillByReference(reference: string): Promise<BillResponseDto> {
    return this.client.get<BillResponseDto>(`/api/v1/bills/records/reference/${reference}`);
  }

  async generateReceipt(transactionId: string): Promise<any> {
    return this.client.get<any>(`/api/v1/bills/records/receipt/${transactionId}`);
  }
}