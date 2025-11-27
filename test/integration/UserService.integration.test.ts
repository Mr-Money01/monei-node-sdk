import { UserService } from '../../src/services/UserService';
import { createTestUserService, requireApiKey } from '../utils/test-setup';
import { UserResponseDto, UpdateUserDto } from '../../src/types';

describe('UserService Integration Tests', () => {
  let userService: UserService;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    userService = createTestUserService();
  });

  describe('getCurrentUser', () => {
    it('should get actual current user from API', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await userService.getCurrentUser();

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      // Verify user data structure
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('firstName');
      expect(result.data).toHaveProperty('lastName');
      expect(result.data).toHaveProperty('kycInfo');
      
      console.log('Actual user data:', {
        id: result.data.id,
        email: result.data.email,
        name: result.data.name,
        verified: result.data.verified
      });
    }, 30000); // Increased timeout for API calls
  });

  describe('updateUser', () => {
    it('should update user information', async () => {
      if (!requireApiKey()) return;

      // First, get current user to have a valid ID
      const currentUser = await userService.getCurrentUser();
      const userId = currentUser.data.id;

      // Arrange
      const updateData: UpdateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        phone: '+1234567890' // Use test phone number
      };

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.firstName).toBe(updateData.firstName);
      expect(result.data.lastName).toBe(updateData.lastName);
      expect(result.data.phone).toBe(updateData.phone);
    }, 30000);
  });
});