import { MoneiClient } from '../../client/MoneiClient';
import {
    PayoutBanksResponseDto,VerifyOfframpBankAccountResponseDto, VerifyOfframpBankAccountRequestDto
} from '../../types';

export class OfframpPayoutService {
  constructor(private client: MoneiClient) {}


  async getBanks(): Promise<PayoutBanksResponseDto> {
    return this.client.post<PayoutBanksResponseDto>('/api/v1/offramp/payouts/banks');
  }

  async verifyBankAccount(data:VerifyOfframpBankAccountRequestDto): Promise<VerifyOfframpBankAccountResponseDto> {
    return this.client.post<VerifyOfframpBankAccountResponseDto>('/api/v1/offramp/payouts/verify', data);
  }
 
}
