import { TransactionNature, TransactionStatus, TransactionType } from "./enums/transaction.enum";

export interface TransactionResponseDto {
  id: string;
  userId: string;

  amount: number; 
  type: TransactionType;
  status: TransactionStatus;

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
  type: TransactionType;
  status: TransactionStatus;

  currency?: string;
  reference: string;
  narration: string;
  nature: TransactionNature;

  user: any;
  wallet: any;
  subwallet?: any;
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
