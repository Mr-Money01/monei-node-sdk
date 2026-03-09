import { AuthAction, AuthType } from "./enums/deposit.enum";
import { TransactionStatus } from "./enums/transaction.enum";
import { AddCardDto, AddUssdDto } from "./wallet";

export interface GeneratePaymentLinkDto {
  amount: number;
  reference?: string;
  currency?: string;
  redirectUrl?: string;
  customization?: Customization;
  customer?: Customer
}

interface Customization {
    title?: string;
}

interface Customer {
  email: string;
  phoneNumber: string;
  name: string;
}

interface DepositNextActionDto {
    type: AuthAction;
    redirect_url?: {
        url: string
    };
    payment_instruction?: {
        note: string;
    }
}

export interface DepositDto {
  amount: number;
  reference?: string;
  currency?: 'NGN';
  narration?: string;
  card?: AddCardDto;
  ussd?: AddUssdDto;
}

export interface PaymentDto {
    amount: number;
    totalAmount:number;
    reference: string;
    currency: string;
    redirectUrl?: string;
    customization?: Customization;
    customer?: Customer;
    narration: string;
    accountNumber?: string;
    bankName?: string;
    accountName?: string;
    expiry_datetime?: string
    note?: string;
    status: TransactionStatus;
    nextAction?: DepositNextActionDto;
}

export interface PaymentResponseDto {
    statusCode: number;
    message: string;
    data: PaymentDto;
    errors?: string;
}

export interface PaymentLinkResponseDto {
  statusCode: number;
  message: string;
  data: PaymentLinkDto;
  errors?: string;
}

export interface DepositWithPaymentMethodDto {
  amount: number;
  paymentMethodId: string;
  reference: string;
  currency: 'NGN';
  redirectUrl: string;
  meta: Record<string, any>;
  narration: string;
}

export interface PaymentLinkDto {
  link: string;
}

export interface DepositAuthDto {
  type: AuthType;
  reference: string;
  pin: string;
  otp: string;
  avs: FlwAvsAuthDto;
}

export interface FlwAvsAuthDto {
  address: FlwBillingAddressDto;
}

export interface FlwBillingAddressDto {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface DepositStatusResponseDto {
    statusCode: number;
    message: string;
    data: PaymentDto;
    errors: {};
}
