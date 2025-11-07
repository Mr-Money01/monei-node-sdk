export interface UserDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  haveTransactionPin: boolean;
  verified: boolean;
  resetToken?: string;
  resetTokenExpiry?: number;
  dob?: string;
  isAdmin: boolean;
  deviceId?: string;
  deviceIp?: string;
  deviceModel?: string;
  platform?: string;
  lastLoggedIn?: string;
}

export interface UpdateUserDto extends Partial<UserDto> {}

export interface UserResponseDto {
  statusCode: number;
  message: string;
  data: UserDto;
}