import { PaymentMethodType } from "./enums/payment-method";
import { CardDto, UssdDto } from "./wallet";

export interface PaymentMethodDto {
  type: PaymentMethodType;
  nickname?: string;
  subWalletId: string;
  card?: CardDto;
  virtualAccountId?: string;
  ussd?: UssdDto;
}

export interface PaymentMethodResponseDto {
  statusCode: number;
  message: string;
  data: PaymentMethodDetailsDto;
}

export interface PaymentMethodsResponseDto {
  statusCode: number;
  message: string;
  data: PaymentMethodDetailsDto[];
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