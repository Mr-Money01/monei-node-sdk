import { describe, it, expect, beforeAll } from '@jest/globals';
import { BillService } from '../../../src/services/BillService';
import { createTestBillService, requireApiKey } from '../../utils/test-setup';
import {  
  ValidateBillDto 
} from '../../../src/types';

describe('BillService Integration Tests', () => {
  let billService: BillService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    billService = createTestBillService();
  });

  // -------------------------------------------------------------------------//
  // VALIDATE BILL                                                           //
  // -------------------------------------------------------------------------//
  describe('validateBill', () => {
    it('should validate bill details', async () => {
      if (!requireApiKey()) return;
      const billData: ValidateBillDto = {
        billerCode: 'YOUR_BILLER_CODE_HERE',
        customer: 'YOUR_CUSTOMER_ID_HERE'
      };
      const result = await billService.validateBill(billData);
      console.log('Get Bill By Reference Response:', result);

      expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      //expect(result).toHaveProperty('message');
      //expect(result).toHaveProperty('data');

      //console.log('Bill Validation Response:', result.data);
    }, 30000);
  });

    
});
