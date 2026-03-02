import { MoneiClient } from "../client/MoneiClient";
import { ResponseDto } from "../types";
import { PaymentMethodDto, PaymentMethodResponseDto, PaymentMethodsResponseDto } from "../types/payment-method";

export class PaymentMethodService {
  constructor(private client: MoneiClient) { }

  async getAll(subWalletId: string): Promise<PaymentMethodsResponseDto> {
    return this.client.get<PaymentMethodsResponseDto>('/api/v1/payment-methods', { params: { subWalletId } });
  }

  async create(
    paymentMethodData: PaymentMethodDto): Promise<PaymentMethodResponseDto> {
    return this.client.post<PaymentMethodResponseDto>('/api/v1/payment-methods', paymentMethodData );
  }


  async get(id: string): Promise<PaymentMethodResponseDto> {
    return this.client.get<PaymentMethodResponseDto>(`/api/v1/payment-methods/${id}`);
  }

  async delete(id: string): Promise<ResponseDto> {
    return this.client.delete<ResponseDto>(`/api/v1/payment-methods/${id}`);
  }

  async setDefault(id: string): Promise<PaymentMethodResponseDto> {
    return this.client.patch<PaymentMethodResponseDto>(`/api/v1/payment-methods/${id}/default`);
  }
}