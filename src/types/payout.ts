import { TransactionStatus } from "./enums/transaction.enum";

export interface BankTransferRequestDto {
  amount: number;
  bank: string;
  accountNumber: string;
  transactionPin: string;
  reference?: string;
  narration?: string;
  meta?: any;
}

export interface BankTransferResponseDataDto {
    reference: string;
    status: TransactionStatus;
    amount: number
}

export interface BankTransferResponseDto {
    statusCode: string;
    message: string;
    data: BankTransferResponseDataDto;
    errors?: any;
}

export interface PeerTransferDto {
  receiver: string;
  amount: number;
  transactionPin: string;
  currency?: string;
}