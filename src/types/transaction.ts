export interface TransactionResponseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string;
  userId: string;
  amount: number;
  type: string;
  status: string;
  reference: string;
  currency: string;
  narration: string;
}

export interface UserTransactionsResponseDto {
  statusCode: number;
  message: string;
  data: TransactionResponseDto[];
}

export interface TransactionDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string;
  user: any;
  wallet: any;
  subwallet: any;
  amount: number;
  type: string;
  status: string;
  currency: string;
  reference: string;
  fincraReference?: string;
  narration: string;
  metadata?: any;
}