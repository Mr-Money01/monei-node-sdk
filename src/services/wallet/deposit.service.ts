import { MoneiClient } from '../../client/MoneiClient';
import { DEPOSIT_METHOD } from '../../types/enums/deposit.enum';
import {
  ResponseDto,
} from '../../types';
import { CreatePaymentLinkDto, DepositAuthorizationDto, DepositResponseDto, DepositWithPaymentMethodDto, InitializeDepositDto, PaymentLinkResponseDto} from '../../types/deposit';

export class DepositService {
  constructor(private client: MoneiClient) { }

  async initializeDeposit( method: DEPOSIT_METHOD, depositData: InitializeDepositDto): Promise<DepositResponseDto> {
    const { data } = await this.client.post<any>('/api/v1/wallet/deposit', depositData, { params: { method }, });
    return data;
  }

  async depositWithPaymentMethod( depositData: DepositWithPaymentMethodDto): Promise<DepositResponseDto> {
    return this.client.post<DepositResponseDto>('/api/v1/wallet/deposit/payment-method', depositData );
  }

  async authorizeDeposit(authorizeData: DepositAuthorizationDto): Promise<ResponseDto> {
    return this.client.post<ResponseDto>('/api/v1/wallet/deposit/authorize', authorizeData );
  }

  async generatePaymentLink(paymentData: CreatePaymentLinkDto): Promise<PaymentLinkResponseDto> {
    return this.client.post<PaymentLinkResponseDto>('/api/v1/wallet/deposit/payment-link',  paymentData );
  }

  async getStatus(reference: string): Promise<ResponseDto> {
    return this.client.get<ResponseDto>(`/api/v1/wallet/deposit/status/${reference}`);
  }

}