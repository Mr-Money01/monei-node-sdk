import { MoneiClient } from "../client/MoneiClient";
import { ResponseDto } from "../types";
import { PaymentMethodDto, PaymentMethodResponseDto, PaymentMethodsResponseDto } from "../types/payment-method";

export class PaymentMethodService {
  constructor(private client: MoneiClient) { }

  async getPaymentMethods(subWalletId: string): Promise<PaymentMethodsResponseDto> {
    return this.client.get<PaymentMethodsResponseDto>('/api/v1/payment-methods', { params: { subWalletId } });
  }

  async createPaymentMethod(
    paymentMethodData: PaymentMethodDto): Promise<PaymentMethodResponseDto> {
    return this.client.post<PaymentMethodResponseDto>('/api/v1/payment-methods', paymentMethodData );
  }


  async getPaymentMethodDetails(id: string): Promise<PaymentMethodResponseDto> {
    return this.client.get<PaymentMethodResponseDto>(`/api/v1/payment-methods/${id}`);
  }

  async deleteUserPaymentMethods(id: string): Promise<ResponseDto> {
    return this.client.delete<ResponseDto>(`/api/v1/payment-methods/${id}`);
  }

  async setDefaultPaymentMethod(id: string): Promise<PaymentMethodResponseDto> {
    return this.client.patch<PaymentMethodResponseDto>(`/api/v1/payment-methods/${id}/default`);
  }
}