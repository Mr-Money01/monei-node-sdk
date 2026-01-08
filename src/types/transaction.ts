export interface TransactionResponseDto {
  id: string;
  userId: string;

  amount: number; 
  type: 'CREDIT' | 'DEBIT';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';

  reference: string;
  currency: string;
  narration: string;

  createdAt: string;
  updatedAt: string;
  deletedDate: string | null;
}


export interface UserTransactionsDataDto {
  transactions: TransactionResponseDto[];
  pagination: PaginationDto;
}

export interface UserTransactionsResponseDto {
  statusCode: number;
  message: string;
  data: UserTransactionsDataDto;
}



export interface TransactionDto {
  id: string;

  amount: number; 
  type: 'CREDIT' | 'DEBIT';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';

  currency: string;
  reference: string;
  fincraReference?: string;
  narration: string;

  user: any;        // you can refine later
  wallet: any;
  subwallet: any;
  metadata?: any;

  createdAt: string;
  updatedAt: string;
  deletedDate: string | null;
}



export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
