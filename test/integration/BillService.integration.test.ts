import { describe, it, expect, beforeAll } from '@jest/globals';
import { BillService } from '../../src/services/BillService';
import { createTestBillService, requireApiKey } from '../utils/test-setup';
import {
  BillCategory,
  ValidateBillDto,
  AirtimePurchaseDto,
  DataPurchaseDto,
  ElectricityPaymentDto,
  CableTvPaymentDto,
  BillerItemsResponseDto,
  BillerDto,
  BillPaymentResponseDto,
  BillPaymentDto,
  ElectricityBillerDto
} from '../../src/types';
import { isBillerDto, isElectricityCodesDto } from '../utils/test-setup';


describe('BillService Integration Tests', () => {
  let billService: BillService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    billService = createTestBillService();
  });

  // -------------------------------------------------------------------------//
  // GET BILLER ITEMS                                                         //
  // -------------------------------------------------------------------------//
  describe('getBillerItems', () => {
    it(`should fetch available biller items for category: AIRTIME and it's billerNames `, async () => {
      if (!requireApiKey()) return;

      const category: BillCategory = 'AIRTIME'; // adjust based on your API
      const billerName = 'mtn'; // adjust based on your API

      const result: BillerItemsResponseDto = await billService.getBillerItems(category, billerName);

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const items: BillerDto[] | ElectricityCodesDto[] = result.data;

      //console.log('Fetched Biller Items:', items);


      expect(Array.isArray(items)).toBe(true);

      // === VALIDATE EVERY ITEM ===
      items.forEach((item, index) => {
        // === FIELD EXISTENCE CHECKS ===
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('biller_code');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('default_commission');
        expect(item).toHaveProperty('date_added');
        expect(item).toHaveProperty('country');
        expect(item).toHaveProperty('is_airtime');
        expect(item).toHaveProperty('biller_name');
        expect(item).toHaveProperty('item_code');
        expect(item).toHaveProperty('short_name');
        expect(item).toHaveProperty('fee');
        expect(item).toHaveProperty('commission_on_fee');
        expect(item).toHaveProperty('reg_expression');
        expect(item).toHaveProperty('label_name');
        expect(item).toHaveProperty('amount');
        expect(item).toHaveProperty('is_resolvable');
        expect(item).toHaveProperty('group_name');
        expect(item).toHaveProperty('category_name');
        expect(item).toHaveProperty('is_data');
        expect(item).toHaveProperty('default_commission_on_amount');
        expect(item).toHaveProperty('commission_on_fee_or_amount');
        expect(item).toHaveProperty('validity_period');

        // === TYPE CHECKS ===

        if (isBillerDto(item)) {

          expect(typeof item.id).toBe('number');
          expect(typeof item.biller_code).toBe('string');
          expect(typeof item.name).toBe('string');
          expect(typeof item.default_commission).toBe('number');
          expect(typeof item.country).toBe('string');
          expect(typeof item.is_airtime).toBe('boolean');
          expect(typeof item.item_code).toBe('string');
          expect(typeof item.short_name).toBe('string');
          expect(typeof item.fee).toBe('number');
          expect(typeof item.commission_on_fee).toBe('boolean');
          expect(typeof item.reg_expression).toBe('string');
          expect(typeof item.label_name).toBe('string');
          expect(typeof item.amount).toBe('number');
          expect(typeof item.is_resolvable).toBe('boolean');
          expect(typeof item.group_name).toBe('string');
          expect(typeof item.category_name).toBe('string');
          expect(item.is_data === null || typeof item.is_data === 'boolean').toBe(true);
          expect(typeof item.default_commission_on_amount).toBe('number');
          expect(typeof item.commission_on_fee_or_amount).toBe('number');
          expect(item.validity_period === null || typeof item.validity_period === 'string').toBe(true);
        }
        // === LOG EACH ITEM ===
        //console.log(`Validated biller item #${index + 1}: ${item.name} (${item.amount}) validity: ${item.validity_period}`);
      });

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);

    it(`should fetch available biller items for category: MOBILEDATA and it's billerNames `, async () => {
      if (!requireApiKey()) return;

      const category: BillCategory = 'MOBILEDATA'; // adjust based on your API
      const billerName = 'mtn'; // adjust based on your API

      const result: BillerItemsResponseDto = await billService.getBillerItems(category, billerName);

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const items: BillerDto[] | ElectricityCodesDto[] = result.data;

      //console.log('Fetched Biller Items:', items);


      expect(Array.isArray(items)).toBe(true);

      // === VALIDATE EVERY ITEM ===
      items.forEach((item, index) => {
        // === FIELD EXISTENCE CHECKS ===
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('biller_code');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('default_commission');
        expect(item).toHaveProperty('date_added');
        expect(item).toHaveProperty('country');
        expect(item).toHaveProperty('is_airtime');
        expect(item).toHaveProperty('biller_name');
        expect(item).toHaveProperty('item_code');
        expect(item).toHaveProperty('short_name');
        expect(item).toHaveProperty('fee');
        expect(item).toHaveProperty('commission_on_fee');
        expect(item).toHaveProperty('reg_expression');
        expect(item).toHaveProperty('label_name');
        expect(item).toHaveProperty('amount');
        expect(item).toHaveProperty('is_resolvable');
        expect(item).toHaveProperty('group_name');
        expect(item).toHaveProperty('category_name');
        expect(item).toHaveProperty('is_data');
        expect(item).toHaveProperty('default_commission_on_amount');
        expect(item).toHaveProperty('commission_on_fee_or_amount');
        expect(item).toHaveProperty('validity_period');

        // === TYPE CHECKS ===
        if (isBillerDto(item)) {

          expect(typeof item.id).toBe('number');
          expect(typeof item.biller_code).toBe('string');
          expect(typeof item.name).toBe('string');
          expect(typeof item.default_commission).toBe('number');
          expect(typeof item.country).toBe('string');
          expect(typeof item.is_airtime).toBe('boolean');
          expect(typeof item.item_code).toBe('string');
          expect(typeof item.short_name).toBe('string');
          expect(typeof item.fee).toBe('number');
          expect(typeof item.commission_on_fee).toBe('boolean');
          expect(typeof item.reg_expression).toBe('string');
          expect(typeof item.label_name).toBe('string');
          expect(typeof item.amount).toBe('number');
          expect(typeof item.is_resolvable).toBe('boolean');
          expect(typeof item.group_name).toBe('string');
          expect(typeof item.category_name).toBe('string');
          expect(item.is_data === null || typeof item.is_data === 'boolean').toBe(true);
          expect(typeof item.default_commission_on_amount).toBe('number');
          expect(typeof item.commission_on_fee_or_amount).toBe('number');
          expect(item.validity_period === null || typeof item.validity_period === 'string').toBe(true);
        }
        // === LOG EACH ITEM ===
        //console.log(`Validated biller item #${index + 1}: ${item.name} (${item.amount}) validity: ${item.validity_period}`);
      });

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);

    it(`should fetch available biller items for category: CABLEBILLS and it's billerNames `, async () => {
      if (!requireApiKey()) return;

      const category: BillCategory = 'CABLEBILLS'; // adjust based on your API
      const billerName = 'dstv'; // adjust based on your API

      const result: BillerItemsResponseDto = await billService.getBillerItems(category, billerName);

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const items: BillerDto[] | ElectricityCodesDto[] = result.data;

      //console.log('Fetched Biller Items:', items);


      expect(Array.isArray(items)).toBe(true);

      // === VALIDATE EVERY ITEM ===
      items.forEach((item, index) => {
        // === FIELD EXISTENCE CHECKS ===
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('biller_code');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('default_commission');
        expect(item).toHaveProperty('date_added');
        expect(item).toHaveProperty('country');
        expect(item).toHaveProperty('is_airtime');
        expect(item).toHaveProperty('biller_name');
        expect(item).toHaveProperty('item_code');
        expect(item).toHaveProperty('short_name');
        expect(item).toHaveProperty('fee');
        expect(item).toHaveProperty('commission_on_fee');
        expect(item).toHaveProperty('reg_expression');
        expect(item).toHaveProperty('label_name');
        expect(item).toHaveProperty('amount');
        expect(item).toHaveProperty('is_resolvable');
        expect(item).toHaveProperty('group_name');
        expect(item).toHaveProperty('category_name');
        expect(item).toHaveProperty('is_data');
        expect(item).toHaveProperty('default_commission_on_amount');
        expect(item).toHaveProperty('commission_on_fee_or_amount');
        expect(item).toHaveProperty('validity_period');

        // === TYPE CHECKS ===
        if (isBillerDto(item)) {

          expect(typeof item.id).toBe('number');
          expect(typeof item.biller_code).toBe('string');
          expect(typeof item.name).toBe('string');
          expect(typeof item.default_commission).toBe('number');
          expect(typeof item.country).toBe('string');
          expect(typeof item.is_airtime).toBe('boolean');
          expect(typeof item.item_code).toBe('string');
          expect(typeof item.short_name).toBe('string');
          expect(typeof item.fee).toBe('number');
          expect(typeof item.commission_on_fee).toBe('boolean');
          expect(typeof item.reg_expression).toBe('string');
          expect(typeof item.label_name).toBe('string');
          expect(typeof item.amount).toBe('number');
          expect(typeof item.is_resolvable).toBe('boolean');
          expect(typeof item.group_name).toBe('string');
          expect(typeof item.category_name).toBe('string');
          expect(item.is_data === null || typeof item.is_data === 'boolean').toBe(true);
          expect(typeof item.default_commission_on_amount).toBe('number');
          expect(typeof item.commission_on_fee_or_amount).toBe('number');
          expect(item.validity_period === null || typeof item.validity_period === 'string').toBe(true);
        }
        // === LOG EACH ITEM ===
        //console.log(`default_commission_on_amount: ${item.default_commission_on_amount}`);
        //console.log(`commission_on_fee_or_amount: ${item.commission_on_fee_or_amount}`);
        //console.log(`Validated biller item #${index + 1}: ${item.name} (${item.amount}) validity: ${item.validity_period}`);
      });

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);

    it(`should fetch available biller items for category: UTILITYBILLS and it's billerNames `, async () => {
      if (!requireApiKey()) return;

      const category: BillCategory = 'UTILITYBILLS'; // adjust based on your API
      const billerName = 'IBADAN DISCO ELECTRICITY'; // adjust based on your API

      const result: BillerItemsResponseDto = await billService.getBillerItems(category, billerName);

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const items: BillerDto[] | ElectricityCodesDto[] = result.data;

      //console.log('Fetched Biller Items:', items);


      expect(Array.isArray(items)).toBe(true);

      // === VALIDATE EVERY ITEM ===
      items.forEach((item, index) => {
        // === FIELD EXISTENCE CHECKS ===
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('biller_code');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('default_commission');
        expect(item).toHaveProperty('date_added');
        expect(item).toHaveProperty('country');
        expect(item).toHaveProperty('is_airtime');
        expect(item).toHaveProperty('biller_name');
        expect(item).toHaveProperty('item_code');
        expect(item).toHaveProperty('short_name');
        expect(item).toHaveProperty('fee');
        expect(item).toHaveProperty('commission_on_fee');
        expect(item).toHaveProperty('reg_expression');
        expect(item).toHaveProperty('label_name');
        expect(item).toHaveProperty('amount');
        expect(item).toHaveProperty('is_resolvable');
        expect(item).toHaveProperty('group_name');
        expect(item).toHaveProperty('category_name');
        expect(item).toHaveProperty('is_data');
        expect(item).toHaveProperty('default_commission_on_amount');
        expect(item).toHaveProperty('commission_on_fee_or_amount');
        expect(item).toHaveProperty('validity_period');

        // === TYPE CHECKS ===
        if (isBillerDto(item)) {

          expect(typeof item.id).toBe('number');
          expect(typeof item.biller_code).toBe('string');
          expect(typeof item.name).toBe('string');
          expect(typeof item.default_commission).toBe('number');
          expect(typeof item.country).toBe('string');
          expect(typeof item.is_airtime).toBe('boolean');
          expect(typeof item.item_code).toBe('string');
          expect(typeof item.short_name).toBe('string');
          expect(typeof item.fee).toBe('number');
          expect(typeof item.commission_on_fee).toBe('boolean');
          expect(typeof item.reg_expression).toBe('string');
          expect(typeof item.label_name).toBe('string');
          expect(typeof item.amount).toBe('number');
          expect(typeof item.is_resolvable).toBe('boolean');
          expect(typeof item.group_name).toBe('string');
          expect(typeof item.category_name).toBe('string');
          expect(item.is_data === null || typeof item.is_data === 'boolean').toBe(true);
          expect(typeof item.default_commission_on_amount).toBe('number');
          expect(typeof item.commission_on_fee_or_amount).toBe('number');
          expect(item.validity_period === null || typeof item.validity_period === 'string').toBe(true);
        }
        // === LOG EACH ITEM ===
        //console.log(`Validated biller item #${index + 1}: ${item.name} (${item.amount}) validity: ${item.validity_period}`);
      });

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);

    it(`should fetch available biller items for category: ELECTRICITYBILLS and it's billerNames `, async () => {
      if (!requireApiKey()) return;

      const result: BillerItemsResponseDto = await billService.getElectricityBillerCodes();

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('StatusCode');
      //expect(result.StatusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const items: ElectricityCodesDto[] | BillerDto[] = result.data;

      //console.log('Fetched Biller Items:', items);


      expect(Array.isArray(items)).toBe(true);

      // === VALIDATE EVERY ITEM ===
      items.forEach((item, index) => {
        // === FIELD EXISTENCE CHECKS ===

        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('code');
        expect(item).toHaveProperty('billerCode');


        // === TYPE CHECKS ===
        if (isElectricityCodesDto(item)) {
          // ✅ TypeScript now knows item is ElectricityCodesDto

          expect(typeof item.name).toBe('string');
          expect(typeof item.code).toBe('string');
          expect(typeof item.billerCode).toBe('string');

          console.log('Electricity code:', item);
        } 
        //expect(typeof item.code).toBe('string');
        //expect(typeof item.billerCode).toBe('string');


        // === LOG EACH ITEM ===
        //console.log(`Validated biller item #${index + 1}: ${item.name} (${item.amount}) validity: ${item.validity_period}`);
      });

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);
  });


  // -------------------------------------------------------------------------
  // BUY AIRTIME
  // -------------------------------------------------------------------------
  describe.skip('buyAirtime', () => {
    it('should purchase airtime successfully', async () => {
      if (!requireApiKey()) return;

      const airtimeData: AirtimePurchaseDto = {
        phoneNumber: '08088447393',
        amount: 350,
        biller: 'airtel',
      };

      const result = await billService.buyAirtime(airtimeData);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const data: BillPaymentDto = result.data;

      // === FIELD EXISTENCE CHECKS ===
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('createdAt');


      expect(result.data).toHaveProperty('userId');
      expect(result.data).toHaveProperty('reference');
      expect(result.data).toHaveProperty('billerCode');
      expect(result.data).toHaveProperty('itemCode');
      expect(result.data).toHaveProperty('customer');
      expect(result.data).toHaveProperty('amount');
      expect(result.data).toHaveProperty('type');
      expect(result.data).toHaveProperty('status');
      expect(result.data).toHaveProperty('txRef');
      expect(result.data).toHaveProperty('billerName');

      // Backend returns `"AIRTIME"` in your sample (same response structure)
      expect(typeof data.type).toBe('string');

      // === MATCH REQUESTED INPUTS ===
      //expect(data.billerCode).toBe(dto.biller);
      //expect(data.itemCode).toBe(airtimeData.biller);
      expect(data.customer).toBe(airtimeData.phoneNumber);


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


      console.log('Airtime Purchase Reference:', result.data.reference);
      console.log('Airtime purchase data:', {
        id: result.data.id,
        amount: result.data.amount,
        name: result.data.billerName,
        status: result.data.status
      });
    }, 30000);
  });

  // -------------------------------------------------------------------------
  // BUY MOBILE DATA
  // -------------------------------------------------------------------------
  describe.skip('buyMobileData', () => {
    it('should successfully purchase mobile data and return transaction details', async () => {
      if (!requireApiKey()) return;

      // === ARRANGE ===
      // These values must match real biller data on your API
      const dto: DataPurchaseDto = {
        biller: 'airtel',   // Example biller code (same as airtime for your sample)
        itemCode: 'MD136',      // Should match real DATA item code on your API
        phoneNumber: '08088447393',
      };

      // === ACT ===
      const result: BillPaymentResponseDto = await billService.buyMobileData(dto);

      // === BASE RESPONSE STRUCTURE ===
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const data: BillPaymentDto = result.data;

      console.log('mobileData :', data);

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


      // Backend returns `"AIRTIME"` in your sample (same response structure)
      expect(typeof data.type).toBe('string');

      // === MATCH REQUESTED INPUTS ===
      //expect(data.billerName).toBe(dto.biller);
      expect(data.itemCode).toBe(dto.itemCode);
      expect(data.customer).toBe(dto.phoneNumber);


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

      // === LOG FOR SUCCESS ===
      console.log('Mobile Data Purchase Successful:', {
        id: data.id,
        amount: data.amount,
        customer: data.customer,
        ref: data.txRef,
        status: data.status,
        metadata: data.metadata,
        token: data.token,
        units: data.units,
        validityPeriod: data.validityPeriod

      });

    }, 60000);
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
  // VALIDATE BILL                                                            //
  // -------------------------------------------------------------------------//
  describe('validateBill', () => {
    it('should validate bill details', async () => {
      if (!requireApiKey()) return;

      const validateData: ValidateBillDto = {
        itemCode: "AT099",
        customer: "07078862245"
      };

      const result = await billService.validateBill(validateData);

      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      console.log('Bill Validation Response:', result.data);
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
