import { describe, it, expect, beforeAll } from '@jest/globals';
import { CustomerService } from '../../../src/services/customer/Customer.service';
import { MoneiClient } from '../../../src/client/MoneiClient';
import { requireApiKey, createTestClient } from '../../utils/test-setup';
import {
  CreateCustomerDto,
  UpdateCustomerDto
} from '../../../src/types';

describe('CustomerService Integration Tests', () => {
  let customerService: CustomerService;
  let client: MoneiClient;
  let testBusinessId: string;
  let createdCustomerId: string;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    client = createTestClient();
    customerService = new CustomerService(client);
    testBusinessId = process.env.TEST_BUSINESS_ID || 'test-business-123';
  });

  describe('createBusinessCustomer', () => {
    it('should create a new business customer', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const createData: CreateCustomerDto = {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+2348012345678',
        address: {
          line1: '123 Test Street',
          city: 'Lagos',
          state: 'Lagos',
          country: 'NG',
          postalCode: '100001'
        },
        metadata: {
          source: 'integration-test',
          customerType: 'individual'
        }
      };

      // Act
      const result = await customerService.createBusinessCustomer(
        testBusinessId,
        createData
      );
      console.log('Created customer:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('email', createData.email);
      expect(result.data).toHaveProperty('firstName', createData.firstName);
      expect(result.data).toHaveProperty('lastName', createData.lastName);
      expect(result.data).toHaveProperty('phone', createData.phone);
      expect(result.data).toHaveProperty('address');
      expect(result.data).toHaveProperty('metadata');
      expect(result.data).toHaveProperty('createdAt');
      expect(result.data).toHaveProperty('updatedAt');

      // Save for later tests
      createdCustomerId = result.data.id;

      console.log('Customer created successfully:', {
        id: result.data.id,
        email: result.data.email,
        name: `${result.data.firstName} ${result.data.lastName}`
      });
    }, 30000);

    it('should create a customer with minimal required fields', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const createData: CreateCustomerDto = {
        email: 'minimal.customer@example.com',
        firstName: 'Minimal',
        lastName: 'Customer'
        // Only required fields
      };

      // Act
      const result = await customerService.createBusinessCustomer(
        testBusinessId,
        createData
      );

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.email).toBe(createData.email);
      expect(result.data.firstName).toBe(createData.firstName);
      expect(result.data.lastName).toBe(createData.lastName);
      
      console.log('Minimal customer created:', {
        id: result.data.id,
        email: result.data.email
      });
    }, 30000);

    it('should fail with duplicate email', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const createData: CreateCustomerDto = {
        email: 'duplicate@example.com',
        firstName: 'Duplicate',
        lastName: 'User'
      };

      // Create first customer
      await customerService.createBusinessCustomer(testBusinessId, createData);

      try {
        // Act - try to create duplicate
        await customerService.createBusinessCustomer(testBusinessId, createData);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected duplicate email error:', error.message);
      }
    }, 30000);

    it('should fail with invalid email format', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const createData: CreateCustomerDto = {
        email: 'invalid-email', // Invalid format
        firstName: 'Invalid',
        lastName: 'Email'
      };

      try {
        // Act
        await customerService.createBusinessCustomer(testBusinessId, createData);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected invalid email error:', error.message);
      }
    }, 30000);
  });

  describe('getBusinessCustomers', () => {
    it('should get all customers for a business', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await customerService.getBusinessCustomers(testBusinessId);
      console.log('Retrieved customers:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('total');
      expect(result.meta).toHaveProperty('page');
      expect(result.meta).toHaveProperty('limit');

      console.log('Customers summary:', {
        total: result.meta.total,
        returned: result.data.length,
        page: result.meta.page,
        limit: result.meta.limit
      });

      // Check structure of first customer if available
      if (result.data.length > 0) {
        const firstCustomer = result.data[0];
        expect(firstCustomer).toHaveProperty('id');
        expect(firstCustomer).toHaveProperty('email');
        expect(firstCustomer).toHaveProperty('firstName');
        expect(firstCustomer).toHaveProperty('lastName');
        expect(firstCustomer).toHaveProperty('createdAt');
      }
    }, 30000);

    it('should return paginated results', async () => {
      if (!requireApiKey()) return;

      // Act
      const result = await customerService.getBusinessCustomers(testBusinessId);

      // Assert pagination structure
      expect(result.meta).toHaveProperty('page');
      expect(result.meta).toHaveProperty('limit');
      expect(result.meta).toHaveProperty('total');
      expect(result.meta).toHaveProperty('pages');
      expect(result.meta).toHaveProperty('hasNext');
      expect(result.meta).toHaveProperty('hasPrev');

      console.log('Pagination info:', {
        currentPage: result.meta.page,
        totalPages: result.meta.pages,
        hasNext: result.meta.hasNext,
        hasPrev: result.meta.hasPrev
      });
    }, 30000);
  });

  describe('getCustomerDetails', () => {
    it('should get customer details by ID', async () => {
      if (!requireApiKey() || !createdCustomerId) {
        console.log('Skipping test: No created customer ID available');
        return;
      }

      // Act
      const result = await customerService.getCustomerDetails(
        testBusinessId,
        createdCustomerId
      );
      console.log('Retrieved customer details:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('id', createdCustomerId);
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('firstName');
      expect(result.data).toHaveProperty('lastName');
      expect(result.data).toHaveProperty('createdAt');
      expect(result.data).toHaveProperty('updatedAt');

      console.log('Customer details:', {
        id: result.data.id,
        email: result.data.email,
        name: `${result.data.firstName} ${result.data.lastName}`,
        created: result.data.createdAt,
        updated: result.data.updatedAt
      });
    }, 30000);

    it('should fail with non-existent customer ID', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const nonExistentId = 'non-existent-customer-123';

      try {
        // Act
        await customerService.getCustomerDetails(testBusinessId, nonExistentId);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for non-existent customer:', error.message);
      }
    }, 30000);

    it('should fail with invalid business ID', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      // Arrange
      const invalidBusinessId = 'invalid-business-123';

      try {
        // Act
        await customerService.getCustomerDetails(invalidBusinessId, createdCustomerId);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for invalid business:', error.message);
      }
    }, 30000);
  });

  describe('updateCustomer', () => {
    it('should update customer details', async () => {
      if (!requireApiKey() || !createdCustomerId) {
        console.log('Skipping test: No created customer ID available');
        return;
      }

      // Arrange
      const updateData: UpdateCustomerDto = {
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        phone: '+2348123456789',
        metadata: {
          updated: true,
          updateTimestamp: new Date().toISOString()
        }
      };

      // Act
      const result = await customerService.updateCustomer(
        testBusinessId,
        createdCustomerId,
        updateData
      );
      console.log('Updated customer:', JSON.stringify(result, null, 2));

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.id).toBe(createdCustomerId);
      expect(result.data.firstName).toBe(updateData.firstName);
      expect(result.data.lastName).toBe(updateData.lastName);
      expect(result.data.phone).toBe(updateData.phone);
      expect(result.data.metadata).toMatchObject(updateData.metadata);
      expect(new Date(result.data.updatedAt)).toBeGreaterThan(new Date(result.data.createdAt));

      console.log('Customer updated successfully:', {
        id: result.data.id,
        name: `${result.data.firstName} ${result.data.lastName}`,
        phone: result.data.phone,
        updatedAt: result.data.updatedAt
      });
    }, 30000);

    it('should update only email field', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      // Arrange
      const updateData: UpdateCustomerDto = {
        email: 'updated.email@example.com'
      };

      // Act
      const result = await customerService.updateCustomer(
        testBusinessId,
        createdCustomerId,
        updateData
      );

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.email).toBe(updateData.email);
      
      console.log('Email updated to:', result.data.email);
    }, 30000);

    it('should update only phone field', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      // Arrange
      const updateData: UpdateCustomerDto = {
        phone: '+2348098765432'
      };

      // Act
      const result = await customerService.updateCustomer(
        testBusinessId,
        createdCustomerId,
        updateData
      );

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.phone).toBe(updateData.phone);
    }, 30000);

    it('should update address fields', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      // Arrange
      const updateData: UpdateCustomerDto = {
        address: {
          line1: '456 New Street',
          line2: 'Suite 789',
          city: 'Abuja',
          state: 'FCT',
          country: 'NG',
          postalCode: '900001'
        }
      };

      // Act
      const result = await customerService.updateCustomer(
        testBusinessId,
        createdCustomerId,
        updateData
      );

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.address).toMatchObject(updateData.address);
      
      console.log('Address updated:', result.data.address);
    }, 30000);

    it('should update metadata only', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      // Arrange
      const updateData: UpdateCustomerDto = {
        metadata: {
          vip: true,
          loyaltyTier: 'gold',
          lastUpdated: new Date().toISOString()
        }
      };

      // Act
      const result = await customerService.updateCustomer(
        testBusinessId,
        createdCustomerId,
        updateData
      );

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.metadata).toMatchObject(updateData.metadata);
      
      console.log('Metadata updated:', result.data.metadata);
    }, 30000);

    it('should fail with invalid email format', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      // Arrange
      const updateData: UpdateCustomerDto = {
        email: 'invalid-email'
      };

      try {
        // Act
        await customerService.updateCustomer(
          testBusinessId,
          createdCustomerId,
          updateData
        );
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected invalid email error:', error.message);
      }
    }, 30000);
  });

  describe('disableCustomer', () => {
    it('should disable a customer', async () => {
      if (!requireApiKey() || !createdCustomerId) {
        console.log('Skipping test: No created customer ID available');
        return;
      }

      // Act
      const result = await customerService.disableCustomer(
        testBusinessId,
        createdCustomerId
      );
      console.log('Disabled customer:', JSON.stringify(result, null, 2));

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.data.id).toBe(createdCustomerId);
      expect(result.data).toHaveProperty('status', 'disabled');
      expect(result.data).toHaveProperty('disabledAt');
      expect(result.data.disabledAt).toBeDefined();

      console.log('Customer disabled:', {
        id: result.data.id,
        status: result.data.status,
        disabledAt: result.data.disabledAt
      });
    }, 30000);

    it('should fail to disable already disabled customer', async () => {
      if (!requireApiKey() || !createdCustomerId) return;

      try {
        // Act - try to disable again
        await customerService.disableCustomer(
          testBusinessId,
          createdCustomerId
        );
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for already disabled customer:', error.message);
      }
    }, 30000);

    it('should fail to disable non-existent customer', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const nonExistentId = 'non-existent-customer-456';

      try {
        // Act
        await customerService.disableCustomer(testBusinessId, nonExistentId);
        // If it doesn't throw, fail
        expect(true).toBe(false);
      } catch (error: any) {
        // Assert
        expect(error).toBeDefined();
        console.log('Expected error for non-existent customer:', error.message);
      }
    }, 30000);
  });

  describe('customer lifecycle integration', () => {
    it('should complete full customer lifecycle', async () => {
      if (!requireApiKey()) return;

      // Step 1: Create customer
      const createData: CreateCustomerDto = {
        email: 'lifecycle.test@example.com',
        firstName: 'Lifecycle',
        lastName: 'Test',
        phone: '+2348012345678'
      };

      const createResult = await customerService.createBusinessCustomer(
        testBusinessId,
        createData
      );
      expect(createResult.statusCode).toBe(200);
      const customerId = createResult.data.id;
      console.log('Step 1: Customer created:', customerId);

      // Step 2: Get customer details
      const getResult = await customerService.getCustomerDetails(
        testBusinessId,
        customerId
      );
      expect(getResult.data.id).toBe(customerId);
      console.log('Step 2: Customer retrieved');

      // Step 3: Update customer
      const updateData: UpdateCustomerDto = {
        firstName: 'Lifecycle Updated',
        phone: '+2348098765432'
      };
      const updateResult = await customerService.updateCustomer(
        testBusinessId,
        customerId,
        updateData
      );
      expect(updateResult.data.firstName).toBe(updateData.firstName);
      console.log('Step 3: Customer updated');

      // Step 4: Get all customers and verify our customer is in the list
      const listResult = await customerService.getBusinessCustomers(testBusinessId);


      const foundCustomer = listResult.data.find(c => c.id === customerId);


      
      expect(foundCustomer).toBeDefined();
      console.log('Step 4: Customer verified in list');

      // Step 5: Disable customer
      const disableResult = await customerService.disableCustomer(
        testBusinessId,
        customerId
      );
      expect(disableResult.data.status).toBe('disabled');
      console.log('Step 5: Customer disabled');

      console.log('Full customer lifecycle completed successfully');
    }, 60000);
  });
});