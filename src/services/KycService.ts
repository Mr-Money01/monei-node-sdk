import { MoneiClient } from '../client/MoneiClient';
import {
  KycStatusDto
} from '../types';

export class KycService {
  constructor(private client: MoneiClient) {}


  async kycStatus(): Promise<KycStatusDto> {
    return this.client.get<KycStatusDto>('/api/v1/kyc/status', );
  }

  async getLimits(): Promise<any> {
    return this.client.get<any>('/api/v1/kyc/limits');
  }

 
}