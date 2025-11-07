import { MoneiClient } from '../client/MoneiClient';
import {
  BalanceResponseDto,
  FundWalletByNairaDto,
  FundWalletByNairaResponseDto,
  UserWalletDto,
  BankListResponseDto,
  VerifyBankAccountRequestDto,
  BankAccountResponseDto,
  WithdrawWalletDto,
  PeerTransferDto,
  VerifyBvnDto,
  UserKycInfoDto
} from '../types';

export class WalletService {
  constructor(private client: MoneiClient) {}

  async getWalletBalance(chainId?: number): Promise<UserWalletDto> {
    const params = chainId ? { chainId } : undefined;
    return this.client.get<UserWalletDto>('/api/v1/wallet/me', { params });
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

  async fundWalletByNaira(fundData: FundWalletByNairaDto): Promise<FundWalletByNairaResponseDto> {
    return this.client.post<FundWalletByNairaResponseDto>('/api/v1/wallet/user/fund-wallet', fundData);
  }

  async getBanks(): Promise<BankListResponseDto> {
    return this.client.get<BankListResponseDto>('/api/v1/wallet/get-banks');
  }

  async verifyBankAccount(verifyData: VerifyBankAccountRequestDto): Promise<BankAccountResponseDto> {
    return this.client.post<BankAccountResponseDto>('/api/v1/wallet/verify-bank-account', verifyData);
  }

  async withdrawFromWallet(withdrawData: WithdrawWalletDto): Promise<any> {
    return this.client.post('/api/v1/wallet/withdrawals', withdrawData);
  }

  async peerTransfer(transferData: PeerTransferDto): Promise<any> {
    return this.client.post('/api/v1/wallet/peer-transfer', transferData);
  }

  async verifyBvn(bvnData: VerifyBvnDto): Promise<UserKycInfoDto> {
    return this.client.post<UserKycInfoDto>('/api/v1/wallet/kyc/bvn', bvnData);
  }
}