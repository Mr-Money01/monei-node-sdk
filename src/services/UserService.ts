import { MoneiClient } from '../client/MoneiClient';
import { UserResponseDto, UpdateUserDto } from '../types';

export class UserService {
  constructor(private client: MoneiClient) {}

  async getCurrentUser(): Promise<UserResponseDto> {
    return this.client.get<UserResponseDto>('/api/v1/user/me');
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    return this.client.patch<UserResponseDto>(`/api/v1/user/update/${id}`, updateData);
  }
}