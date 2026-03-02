import { MoneiClient } from '../client/MoneiClient';
import {
  UserTransactionsResponseDto,
  TransactionDto
} from '../types';
import { TransactionType } from '../types/enums/transaction.enum'


export class TransactionService {
  constructor(private client: MoneiClient) {}

  async getUserTransactions(): Promise<UserTransactionsResponseDto> {
    return this.client.get<UserTransactionsResponseDto>('/api/v1/transactions/user');
  }

  async getTransactionsByType(type: TransactionType) {
    const response = await this.getUserTransactions()

    return {
      transactions: response.data.transactions.filter(
        (t) => t.type === type
      ),
      pagination: response.data.pagination
    }
  }

  async getDeposits(){
    const response = await this.getTransactionsByType(TransactionType.CREDIT)
    //console.log('response:', response)

    return response
  }

  async getDeposit(params: { id: string } | { reference: string }): Promise<TransactionDto> {
    if ('id' in params) {
      return this.getById(params.id);
    } else {
      return this.getByReference(params.reference);
    }
  }



  async getById(id: string): Promise<TransactionDto> {
    return this.client.get<TransactionDto>(`/api/v1/transactions/${id}`);
  }

  async getByReference(reference: string): Promise<TransactionDto> {
    return this.client.get<TransactionDto>(`/api/v1/transactions/reference/${reference}`);
  }
}

