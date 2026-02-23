import { PaymentMethodType } from "./enums/payment-method";
import { AddCardDto, AddUssdDto } from "./wallet";

export interface PaymentMethodDto {
  type: PaymentMethodType;
  nickname?: string;
  subWalletId: string;
  card?: AddCardDto;
  virtualAccountId?: string;
  ussd?: AddUssdDto;
}

export interface PaymentMethodResponseDto {
  statusCode: number;
  message: string;
  data: PaymentMethodDetailsDto;
  errors?: {};
}

export interface PaymentMethodsResponseDto {
  statusCode: number;
  message: string;
  data: PaymentMethodDetailsDto[];
  errors?: {};
}



export interface PaymentMethodDetailsDto {
  id: string;
  type: PaymentMethodType;
  status: string;
  isDefault: boolean;
  nickname?: string;
  isEnabled: boolean;
  lastUsedAt: string | null;
  usageCount: number;
  capability: {};
  details: {};
  createdAt: string;
  updatedAt: string;
}