import { MoneiClient } from '../client/MoneiClient';
import { UserResponseDto, UpdateUserDto, KycStatusDto } from '../types';

export class UserService {
  constructor(private client: MoneiClient) { }

  async getCurrentUser(): Promise<UserResponseDto> {
    return this.client.get<UserResponseDto>('/api/v1/user/me');
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    return this.client.patch<UserResponseDto>(`/api/v1/user/update/${id}`, updateData);
  }

  async kycStatus(): Promise<KycStatusDto> {
    return this.client.get<KycStatusDto>('/api/v1/kyc/status',);
  }

  async getDepositLimit(){
    return this.client.get<any>('/api/v1/kyc/limits');
  }

}