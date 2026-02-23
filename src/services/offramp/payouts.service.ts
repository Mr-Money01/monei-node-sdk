import { MoneiClient } from '../../client/MoneiClient';
import {
    OfframpBanksResponseDto,VerifyOfframpBankResponseDto,VerifyOfframpBankRequesteDto
  
} from '../../types';

export class OfframpLayoutService {
  constructor(private client: MoneiClient) {}


  async getOfframpBanks(): Promise<OfframpBanksResponseDto> {
    return this.client.post<OfframpBanksResponseDto>('/api/v1/offramp/payouts/banks');
  }

  async verifyOfframpBank(data:VerifyOfframpBankRequesteDto): Promise<VerifyOfframpBankResponseDto> {
    return this.client.post<VerifyOfframpBankResponseDto>('/api/v1/offramp/payouts/verify', data);
  }

 
 
}