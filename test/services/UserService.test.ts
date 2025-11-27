import { UserService } from '../../src/services/UserService';
import { createMockMoneiClient } from '../mocks/monei-client.mock';
import { mockUserResponse, mockUserDto } from '../mocks/api-responses.mock';
import { UpdateUserDto, UserResponseDto } from '../../src/types';
import { MoneiError } from '../../src/errors/MoneiError';

describe('UserService', () => {
  let userService: UserService;
  let mockClient: ReturnType<typeof createMockMoneiClient>;

  beforeEach(() => {
    mockClient = createMockMoneiClient();
    userService = new UserService(mockClient as any);
  });

  describe('getCurrentUser', () => {
    it('should return current user data with proper response structure', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockUserResponse);

      // Act
      const result = await userService.getCurrentUser();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/user/me');
      expect(result).toEqual(mockUserResponse);
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Success');
      expect(result.data.id).toBe('user-123');
      expect(result.data.email).toBe('test@example.com');
    });

    it('should throw error when API call fails', async () => {
      // Arrange
      const error = new MoneiError('Network error');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(userService.getCurrentUser()).rejects.toThrow(MoneiError);
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/user/me');
    });

    it('should handle authentication error (401)', async () => {
      // Arrange
      const authError = new MoneiError('Unauthorized', 401);
      mockClient.get.mockRejectedValue(authError);

      // Act & Assert
      await expect(userService.getCurrentUser()).rejects.toThrow('Unauthorized');
      await expect(userService.getCurrentUser()).rejects.toHaveProperty('statusCode', 401);
    });
  });

  describe('updateUser', () => {
    it('should update user and return updated user response', async () => {
      // Arrange
      const userId = 'user-123';
      const updateData: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567890'
      };
      const updatedUserResponse: UserResponseDto = {
        ...mockUserResponse,
        data: {
          ...mockUserDto,
          ...updateData,
          name: 'Jane Smith',
          updatedAt: '2023-01-02T00:00:00.000Z'
        }
      };
      mockClient.patch.mockResolvedValue(updatedUserResponse);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        `/api/v1/user/update/${userId}`,
        updateData
      );
      expect(result).toEqual(updatedUserResponse);
      expect(result.data.firstName).toBe('Jane');
      expect(result.data.lastName).toBe('Smith');
      expect(result.data.name).toBe('Jane Smith');
    });

    it('should handle partial updates correctly', async () => {
      // Arrange
      const userId = 'user-123';
      const updateData: UpdateUserDto = {
        phone: '+1987654321'
      };
      const updatedUserResponse: UserResponseDto = {
        ...mockUserResponse,
        data: {
          ...mockUserDto,
          phone: '+1987654321',
          updatedAt: '2023-01-02T00:00:00.000Z'
        }
      };
      mockClient.patch.mockResolvedValue(updatedUserResponse);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        `/api/v1/user/update/${userId}`,
        updateData
      );
      expect(result.data.phone).toBe('+1987654321');
      // Ensure other fields remain unchanged
      expect(result.data.firstName).toBe('John');
      expect(result.data.email).toBe('test@example.com');
    });

    it('should handle validation errors (400)', async () => {
      // Arrange
      const userId = 'user-123';
      const updateData: UpdateUserDto = { email: 'invalid-email' }; // Invalid email
      const validationError = new MoneiError('Validation failed: Invalid email', 400);
      mockClient.patch.mockRejectedValue(validationError);

      // Act & Assert
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow('Validation failed: Invalid email');
      expect(mockClient.patch).toHaveBeenCalledWith(
        `/api/v1/user/update/${userId}`,
        updateData
      );
    });

    it('should handle user not found (404)', async () => {
      // Arrange
      const userId = 'non-existent-user';
      const updateData: UpdateUserDto = { firstName: 'Test' };
      const notFoundError = new MoneiError('User not found', 404);
      mockClient.patch.mockRejectedValue(notFoundError);

      // Act & Assert
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow('User not found');
    });
  });
});