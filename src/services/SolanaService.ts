import { MoneiClient } from '../client/MoneiClient';
import {
  WalletAddressResponseDto,
  BalanceResponseDto,
  PortfolioResponseDto,
  TransferSolDto,
  TransferTokenDto,
  SignatureResponseDto,
  SolanaNetwork
} from '../types';

export class SolanaService {
  constructor(private client: MoneiClient) {}

  async getWalletAddress(): Promise<WalletAddressResponseDto> {
    return this.client.get<WalletAddressResponseDto>('/api/v1/solana/address');
  }

  async getNativeBalance(network?: SolanaNetwork): Promise<BalanceResponseDto> {
    const params = network ? { network } : undefined;
    return this.client.get<BalanceResponseDto>('/api/v1/solana/balance', { params });
  }

  async getTokenBalance(tokenMintAddress: string, network?: SolanaNetwork): Promise<BalanceResponseDto> {
    const params = network ? { network } : undefined;
    return this.client.get<BalanceResponseDto>(`/api/v1/solana/token-balance/${tokenMintAddress}`, { params });
  }

  async getPortfolio(network?: SolanaNetwork): Promise<PortfolioResponseDto> {
    const params = network ? { network } : undefined;
    return this.client.get<PortfolioResponseDto>('/api/v1/solana/portfolio', { params });
  }

  async sendNativeToken(transferData: TransferSolDto): Promise<SignatureResponseDto> {
    return this.client.post<SignatureResponseDto>('/api/v1/solana/transfer', transferData);
  }

  async sendToken(transferData: TransferTokenDto): Promise<SignatureResponseDto> {
    return this.client.post<SignatureResponseDto>('/api/v1/solana/transfer-token', transferData);
  }
}