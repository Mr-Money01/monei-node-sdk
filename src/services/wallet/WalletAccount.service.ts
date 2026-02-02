import { MoneiClient } from '../../client/MoneiClient';
import {
  CreateVirtualAccountDataDto,
  UserWalletResponseDto,
  VirtualAccountDto,
  VirtualAccountResponseDto,
} from '../../types';

export class WalletAccountService {
  constructor(private client: MoneiClient) { }

  async getWallet(chainId?: number): Promise<UserWalletResponseDto> {
    //const params = chainId ? { chainId } : undefined;

    return this.client.get<UserWalletResponseDto>('/api/v1/wallet/me', { params: { chainId } });
  }

  async createVirtualAccount(accountData: CreateVirtualAccountDataDto): Promise<VirtualAccountResponseDto> {
    return this.client.post<VirtualAccountResponseDto>(
      '/api/v1/wallet/virtual-account',
      accountData
    );
  }


}