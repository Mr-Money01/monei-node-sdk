import { MoneiClient } from '../client/MoneiClient';
import {
  
} from '../types';

export class KycService {
  constructor(private client: MoneiClient) {}


  async kycStatus(): Promise<> {
    return this.client.post<>('/api/v1/kyc/status', );
  }

  async submitNin(): Promise<> {
    return this.client.post<>('/api/v1/kyc/submit-nin', );
  }

  async submitBvn(): Promise<> {
    return this.client.post<>('/api/v1/kyc/submit-bvn', );
  }

  async uploadDocument( ): Promise<> {
    return this.client.post<>('/api/v1/kyc/upload-document', );
  }

  async checkEligibility(): Promise<> {
    return this.client.post<>('/api/v1/kyc/check-eligibility', );
  }

  async checkLimits(): Promise<> {
    return this.client.post<>('/api/v1/kyc/check-eligibility');
  }

 
}