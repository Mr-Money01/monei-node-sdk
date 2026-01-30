import { MoneiClient } from '../../client/MoneiClient';
import {
  UserWalletDto,
  VirtualAccountDto,
  VirtualAccountResponseDto, VirtualDataDto
} from '../../types';

export class WalletServiceAccount {
  constructor(private client: MoneiClient) { }

  async getWallet(chainId?: number): Promise<UserWalletDto> {
    //const params = chainId ? { chainId } : undefined;

    return this.client.get<UserWalletDto>('/api/v1/wallet/me', { params: { chainId } });
  }

  async createVirtualAccount(accountData: VirtualDataDto): Promise<VirtualAccountResponseDto> {
    return this.client.post<VirtualAccountResponseDto>(
      '/api/v1/wallet/virtual-account',
      accountData
    );
  }


}