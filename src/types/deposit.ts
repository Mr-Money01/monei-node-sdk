import { AuthAction, AuthType } from "./enums/deposit.enum";
import { TransactionStatus } from "./enums/transaction.enum";
import { CardDto, UssdDto } from "./wallet";

export interface CreatePaymentLinkDto {
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

interface NextAction {
    type: AuthAction;
    redirect_url?: {
        url: string
    };
    payment_instruction?: {
        note: string;
    }
}

export interface InitializeDepositDto {
  amount: number;
  reference?: string;
  currency?: 'NGN';
  narration?: string;
  card?: CardDto;
  ussd?: UssdDto;
}

export interface DepositResponseDataDto {
    amount: number;
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
    nextAction?: NextAction;
}

export interface DepositResponseDto {
    statusCode: number;
    message: string;
    data: DepositResponseDataDto;
    errors?: string;
}

export interface PaymentLinkResponseDto {
  statusCode: number;
  message: string;
  data: LinkDto;
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

export interface PaymentResponseDto {
  statusCode: number;
  message: string;
  data: LinkDto;
  errors?: string;
}

export interface LinkDto {
  link: string;
}

export interface DepositAuthorizationDto {
  type: AuthType;
  reference: string;
  pin: string;
  otp: string;
  avs: AvsDto;
}

export interface AvsDto {
  address: AvsAddressDto;
}

export interface AvsAddressDto {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}