import { MoneiClient } from '../../client/MoneiClient';
import {
  DepositMethod,
  paymentDataDto,
  paymentMethodDto,
  UserWalletDto,
  VirtualAccountDto,
  WalletDepositDto,
  authorizationDto,
  paymentMethodResponseDto,
  paymentMethodsResponseDto,
  ResponseDto,
  paymentLinkResponseDto,
  PaymentLinkDataDto,
  WalletDepositResponseDto,
  WalletDepositDataDto
} from '../../types';


export class WalletServiceDeposit {
  constructor(private client: MoneiClient) { }

  async depositWallet( method: DepositMethod, depositData: WalletDepositDataDto): Promise<any> {
    const { data } = await this.client.post<any>('/api/v1/wallet/deposit', depositData, { params: { method }, });
    return data;
  }

  async createPayment( depositData: paymentDataDto): Promise<WalletDepositResponseDto> {
    return this.client.post<WalletDepositResponseDto>('/api/v1/wallet/deposit/payment-method', depositData );
  }

  async authorizeDeposit(authorizeData: authorizationDto): Promise<any> {
    return this.client.post<any>('/api/v1/wallet/deposit/authorize', authorizeData );
  }

  async getPaymentLink(paymentData: PaymentLinkDataDto): Promise<paymentLinkResponseDto> {
    return this.client.post<paymentLinkResponseDto>('/api/v1/wallet/deposit/payment-link',  paymentData );
  }

  async getStatus(reference: string): Promise<ResponseDto> {
    return this.client.get<ResponseDto>(`/api/v1/wallet/deposit/status/${reference}`);
  }

  async syncAccount(subWalletId: string): Promise<ResponseDto> {
    return this.client.post<ResponseDto>('/api/v1/payment-methods/sync',  { subWalletId } );
  }

  async getUserPaymentMethods(subWalletId: string): Promise<paymentMethodsResponseDto> {
    return this.client.get<paymentMethodsResponseDto>('/api/v1/payment-methods', { params: { subWalletId } });
  }

  async createPaymentMethod(
  paymentMethodData: paymentMethodDto): Promise<paymentMethodResponseDto> {
  return this.client.post<paymentMethodResponseDto>('/api/v1/payment-methods', paymentMethodData );
}


  async getPaymentMethodDetails(id: string): Promise<paymentMethodResponseDto> {
    return this.client.get<paymentMethodResponseDto>(`/api/v1/payment-methods/${id}`);
  }

  async deleteUserPaymentMethods(id: string): Promise<ResponseDto> {
    return this.client.delete<ResponseDto>(`/api/v1/payment-methods/${id}`);
  }

  async setDefaultPaymentMethod(id: string): Promise<paymentMethodResponseDto> {
    return this.client.patch<paymentMethodResponseDto>(`/api/v1/payment-methods/${id}/default`);
  }
}