import { describe, it, expect, beforeAll } from '@jest/globals';
import { BillService } from '../../../src/services/BillService';
import { createTestBillService, requireApiKey } from '../../utils/test-setup';
import {
  ValidateBillDto,
  ElectricityPaymentDto,
  CableTvPaymentDto,
  BillPaymentResponseDto,
  BillPaymentDto,
  
} from '../../../src/types';



describe('BillService Integration Tests', () => {
  let billService: BillService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    billService = createTestBillService();
  });


  // -------------------------------------------------------------------------
  // SUBSCRIBE CABLE TV
  // -------------------------------------------------------------------------
  describe.skip('subscribeCableTv', () => {
    it('should subscribe to cable TV package', async () => {
      if (!requireApiKey()) return;

      // === ARRANGE ===
      // Replace these with real cable TV biller details from your API
      const dto: CableTvPaymentDto = {
        smartcardNumber: 'BIL102',  // Example: Replace with actual cable TV biller
        itemCode: 'AT133',     // Replace with actual subscription package code
        biller: '1234567890', // Could be smartcard/IUC number depending on API
      };

      // === ACT ===
      const result: BillPaymentResponseDto = await billService.subscribeCableTv(dto);

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const data = result.data;

      // === FIELD EXISTENCE CHECKS ===
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('createdAt');
      expect(data).toHaveProperty('userId');
      expect(data).toHaveProperty('reference');
      expect(data).toHaveProperty('billerCode');
      expect(data).toHaveProperty('itemCode');
      expect(data).toHaveProperty('customer');
      expect(data).toHaveProperty('amount');
      expect(data).toHaveProperty('type');
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('txRef');
      expect(data).toHaveProperty('billerName');
      expect(data).toHaveProperty('metadata');
      expect(data).toHaveProperty('token');
      expect(data).toHaveProperty('units');
      expect(data).toHaveProperty('validityPeriod');

      // === validate values from DTO ===
      expect(data.billerCode).toBe(dto.biller);
      expect(data.itemCode).toBe(dto.itemCode);
      expect(data.customer).toBe(dto.smartcardNumber);


      // === TYPE VALIDATION ===
      expect(typeof data.id).toBe('string');
      expect(typeof data.createdAt).toBe('string');
      expect(typeof data.userId).toBe('string');
      expect(typeof data.reference).toBe('string');
      expect(typeof data.status).toBe('string');
      expect(typeof data.txRef).toBe('string');
      expect(typeof data.billerName).toBe('string');

      // === LOG SUCCESS ===
      console.log('Cable TV Subscription Successful:', {
        id: data.id,
        amount: data.amount,
        customer: data.customer,
        ref: data.txRef,
        status: data.status
      });
    }, 30000);
  });

  // -------------------------------------------------------------------------//
  // BUY ELECTRICITY                                                          //
  // -------------------------------------------------------------------------//
  describe.skip('buyElectricity', () => {
    it('should purchase electricity token', async () => {
      if (!requireApiKey()) return;

      // === ARRANGE ===
      // Ensure these values match your actual API billers and item codes
      const dto: ElectricityPaymentDto = {
        meterNumber: '45083311550',  // Example: Replace with correct electricity biller
        disco: 'IBADAN DISCO ELECTRICITY',        // Replace with actual Disco code from your API
        amount: 100,
      };

      // === ACT ===
      const result: BillPaymentResponseDto = await billService.buyElectricity(dto);

      console.log('Electricity Purchase Result:', result);

      // === BASE RESPONSE CHECKS ===
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const data: BillPaymentDto = result.data;

      console.log('Electricity Payment Response Data:', data);

      // === FIELD EXISTENCE CHECKS ===


      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('createdAt');
      expect(data).toHaveProperty('userId');
      expect(data).toHaveProperty('reference');
      expect(data).toHaveProperty('billerCode');
      expect(data).toHaveProperty('itemCode');
      expect(data).toHaveProperty('customer');
      expect(data).toHaveProperty('amount');
      //expect(data.payload).toHaveProperty('amount');
      //expect(data.payload).toHaveProperty('meterNumber');
      //expect(data.payload).toHaveProperty('disco');
      expect(data).toHaveProperty('type');
      expect(data).toHaveProperty('status');
      //expect(data).toHaveProperty('executionDate');
      //expect(data).toHaveProperty('isRecurring');
      //expect(data).toHaveProperty('recurrencePattern');
      //expect(data).toHaveProperty('nextExecutionDate');
      expect(data).toHaveProperty('txRef');
      expect(data).toHaveProperty('billerName');
      expect(data).toHaveProperty('metadata');
      expect(data).toHaveProperty('token');
      expect(data).toHaveProperty('units');
      expect(data).toHaveProperty('validityPeriod');

      // === MATCH REQUESTED INPUTS ===

      expect(data.customer).toBe(dto.meterNumber);
      expect(data.billerName).toBe(dto.disco);
      expect(data.amount).toBe(dto.amount);

      // === TYPE CHECKS ===

      expect(typeof data.id).toBe('string');
      expect(typeof data.createdAt).toBe('string');
      expect(typeof data.userId).toBe('string');
      expect(typeof data.reference).toBe('string');
      expect(typeof data.billerCode).toBe('string');
      expect(typeof data.itemCode).toBe('string');
      expect(typeof data.customer).toBe('string');
      expect(typeof data.amount).toBe('number');
      expect(typeof data.type).toBe('string');
      expect(typeof data.status).toBe('string');
      expect(typeof data.txRef).toBe('string');
      expect(typeof data.billerName).toBe('string');
      expect(data.metadata === null || data.metadata === 'string').toBe(true);
      expect(data.token === null || data.token === 'string').toBe(true);
      expect(data.units === null || data.units === 'string').toBe(true);
      expect(data.validityPeriod === null || data.validityPeriod === 'string').toBe(true);

      //expect(typeof data.executionDate).toBe('string');
      //expect(typeof data.isRecurring).toBe('string');
      //expect(typeof data.status).toBe('string');
      //expect(typeof data.recurrencePattern).toBe('string');
      //expect(typeof data.updatedAt).toBe('string');
      //expect(typeof data.payload.amount).toBe('string');
      //expect(typeof data.payload.customer).toBe('string');
      //expect(typeof data.payload.meterNumber).toBe('string');
      //expect(typeof data.nextExecutionDate).toBe('string');
      //expect(typeof data.type).toBe('string');
      //expect(typeof data.deletedDate).toBe('string');

      // === LOG SUCCESS ===
      console.log('Electricity Payment Successful:', {
        id: data.id,
        amount: data.amount,
        customer: data.customer,
        ref: data.txRef,
        status: data.status
      });

    }, 30000);
  });





  // -------------------------------------------------------------------------//
  // GET BILL BY REFERENCE                                                    //
  // -------------------------------------------------------------------------//
  describe('getBillByReference', () => {
    it('should validate get bill transaction details by reference number', async () => {
      if (!requireApiKey()) return;
      const result = await billService.getBillByReference('YOUR_BILL_REFERENCE_HERE');
      console.log('Get Bill By Reference Response:', result);

      expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      //expect(result).toHaveProperty('message');
      //expect(result).toHaveProperty('data');

      //console.log('Bill Validation Response:', result.data);
    }, 30000);
  });

  // -------------------------------------------------------------------------//
  // GET RECEIPT BY TRANSACTION ID                                                    //
  // -------------------------------------------------------------------------//
  describe('getReceiptByTransactionId', () => {
    it('should get a transaction receipt by it Id', async () => {
      if (!requireApiKey()) return;
      const result = await billService.generateReceipt('YOUR_BILL_REFERENCE_HERE');
      console.log('Get Bill By Reference Response:', result);

      expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      //expect(result).toHaveProperty('message');
      //expect(result).toHaveProperty('data');

      //console.log('Bill Validation Response:', result.data);
    }, 30000);
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

  // -------------------------------------------------------------------------//
  // GET BILLS                                                               //
  // -------------------------------------------------------------------------//
  describe('getBills', () => {
    it('should get bill transaction details of a user', async () => {
      if (!requireApiKey()) return;
      const result = await billService.getBills();
      console.log('Get Bills Response:', result);

      expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      //expect(result).toHaveProperty('message');
      //expect(result).toHaveProperty('data');

      //console.log('Bill Validation Response:', result.data);
    }, 30000);
  });


  
});
