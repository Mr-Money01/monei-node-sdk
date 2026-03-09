import { MoneiClient } from '../../client/MoneiClient';
import {
    VerifyOfframpBankAccountResponseDto, VerifyOfframpBankAccountRequestDto,
    OfframpPayoutBanksResponseDto
} from '../../types';

export class OfframpPayoutService {
  constructor(private client: MoneiClient) {}


  async getBanks(): Promise<OfframpPayoutBanksResponseDto> {
    return this.client.get<OfframpPayoutBanksResponseDto>('/api/v1/offramp/payouts/banks');
  }

  async verifyBankAccount(data:VerifyOfframpBankAccountRequestDto): Promise<VerifyOfframpBankAccountResponseDto> {
    return this.client.post<VerifyOfframpBankAccountResponseDto>('/api/v1/offramp/payouts/verify', data);
  }
 
}
