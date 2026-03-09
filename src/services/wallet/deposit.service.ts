import { MoneiClient } from '../../client/MoneiClient';
import { DEPOSIT_METHOD } from '../../types/enums/deposit.enum';
import {
  ResponseDto,DepositAuthResponseDto,
} from '../../types';
import { GeneratePaymentLinkDto,  DepositWithPaymentMethodDto,DepositAuthDto, PaymentLinkResponseDto,DepositDto,PaymentResponseDto, DepositStatusResponseDto} from '../../types/deposit';

export class DepositService {
  constructor(private client: MoneiClient) { }

  async initializeDeposit( method: DEPOSIT_METHOD, depositData: DepositDto): Promise<PaymentResponseDto> {
    const { data } = await this.client.post<any>('/api/v1/wallet/deposit', depositData, { params: { method }, });
    return data;
  }

  async depositWithPaymentMethod( depositData: DepositWithPaymentMethodDto): Promise<PaymentResponseDto> {
    return this.client.post<PaymentResponseDto>('/api/v1/wallet/deposit/payment-method', depositData );
  }

  async authorizeDeposit(authorizeData: DepositAuthDto): Promise<DepositAuthResponseDto> {
    return this.client.post<DepositAuthResponseDto>('/api/v1/wallet/deposit/authorize', authorizeData );
  }

  async generatePaymentLink(paymentData: GeneratePaymentLinkDto): Promise<PaymentLinkResponseDto> {
    return this.client.post<PaymentLinkResponseDto>('/api/v1/wallet/deposit/payment-link',  paymentData );
  }

  async getStatus(reference: string): Promise<DepositStatusResponseDto> {
    return this.client.get<DepositStatusResponseDto>(`/api/v1/wallet/deposit/status/${reference}`);
  }

}