import { MoneiClient } from '../client/MoneiClient';
import {
  UserEvmPortfolioResponseDto,
  SendNativeTokenDto,
  SendNativeTokenResponseDto,
  SendTokenDto,
  SendTokenResponseDto,
  BalanceResponseDto
} from '../types';

export class EvmService {
  constructor(private client: MoneiClient) {}

  async getPortfolio(chainId: number): Promise<UserEvmPortfolioResponseDto> {
    return this.client.get<UserEvmPortfolioResponseDto>(`/api/v1/evm/portfolio/${chainId}`);
  }

  async getNativeBalance(chainId: number): Promise<BalanceResponseDto> {
    return this.client.get<BalanceResponseDto>('/api/v1/evm/balance/native', {
      params: { chainId }
    });
  }

  async getTokenBalance(tokenAddress: string, chainId: number): Promise<BalanceResponseDto> {
    return this.client.get<BalanceResponseDto>('/api/v1/evm/balance/token', {
      params: { tokenAddress, chainId }
    });
  }

  async sendNativeToken(sendData: SendNativeTokenDto): Promise<SendNativeTokenResponseDto> {
    return this.client.post<SendNativeTokenResponseDto>('/api/v1/evm/send/native', sendData);
  }

  async sendToken(sendData: SendTokenDto): Promise<SendTokenResponseDto> {
    return this.client.post<SendTokenResponseDto>('/api/v1/evm/send/token', sendData);
  }
}