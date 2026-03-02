import { MoneiClient } from '../client/MoneiClient';
import {
  CreateCustomerDto, UpdateCustomerDto
} from '../types';

export class BusinessService { // Renamed to be more accurate
  constructor(private client: MoneiClient) {}

  /**
   * Create a new business customer
   * @param business_id - The business ID
   * @param createData - Customer creation data
   */
  async createBusinessCustomer(
    business_id: string, 
    createData: CreateCustomerDto
  ): Promise<any> {
    return this.client.post<any>(
      `/api/v1/customers/${business_id}`,
      createData // Add request body
    );
  }

  /**
   * Get all customers for a business
   * @param business_id - The business ID
   */
  async getBusinessCustomers(
    business_id: string
  ): Promise<any> {
    return this.client.get<any>(
      `/api/v1/customers/${business_id}`
    );
  }

  /**
   * Get customer details by ID
   * @param business_id - The business ID
   * @param customer_id - The customer ID
   */
  async getCustomerDetails(
    business_id: string, 
    customer_id: string
  ): Promise<any> {
    return this.client.get<any>(
      `/api/v1/customers/${business_id}/${customer_id}`
    );
  }

  /**
   * Update a customer
   * @param business_id - The business ID
   * @param customer_id - The customer ID
   * @param updateData - Customer update data
   */
  async updateCustomer(
    business_id: string, 
    customer_id: string,
    updateData: UpdateCustomerDto
  ): Promise<any> {
    return this.client.patch<any>(
      `/api/v1/customers/${business_id}/${customer_id}`,
      updateData // Add request body
    );
  }

  /**
   * Disable a customer
   * @param business_id - The business ID
   * @param customer_id - The customer ID
   */
  async disableCustomer(
    business_id: string, 
    customer_id: string
  ): Promise<any> {
    return this.client.patch<any>(
      `/api/v1/customers/${business_id}/${customer_id}/disable`
      // Note: Added /disable endpoint if that's the correct path
    );
  }
}