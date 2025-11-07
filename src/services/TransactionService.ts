import { MoneiClient } from '../client/MoneiClient';
import {
  UserTransactionsResponseDto,
  TransactionDto
} from '../types';

export class TransactionService {
  constructor(private client: MoneiClient) {}

  async getUserTransactions(): Promise<UserTransactionsResponseDto> {
    return this.client.get<UserTransactionsResponseDto>('/api/v1/transactions/user');
  }

  async getTransactionById(id: string): Promise<TransactionDto> {
    return this.client.get<TransactionDto>(`/api/v1/transactions/${id}`);
  }

  async getTransactionByReference(reference: string): Promise<TransactionDto> {
    return this.client.get<TransactionDto>(`/api/v1/transactions/reference/${reference}`);
  }
}