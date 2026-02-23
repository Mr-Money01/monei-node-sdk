import { describe, it, expect, beforeAll } from '@jest/globals';
import { BillService } from '../../../src/services/BillService';
import { createTestBillService, requireApiKey } from '../../utils/test-setup';
import {
  BillCategory,
  BillerItemsResponseDto,
  BillerDto,
  ElectricityBillerDto,
  ElectricityBillerResponseDto
} from '../../../src/types';



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

      const items: BillerDto[] = result.data;

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
      );

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

      const items: BillerDto[]  = result.data;

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

      const items: BillerDto[]  = result.data;

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

      const items: BillerDto[] = result.data;

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
        
        // === LOG EACH ITEM ===
        //console.log(`Validated biller item #${index + 1}: ${item.name} (${item.amount}) validity: ${item.validity_period}`);
      });

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);

    it(`should fetch available biller items for category: ELECTRICITYBILLS and it's billerNames `, async () => {
      if (!requireApiKey()) return;

      const result: ElectricityBillerResponseDto = await billService.getElectricityBiller();

      // === BASE RESPONSE ===
      expect(result).toHaveProperty('StatusCode');
      //expect(result.StatusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      const items:  ElectricityBillerDto[] = result.data;

      //console.log('Fetched Biller Items:', items);


      expect(Array.isArray(items)).toBe(true);

      // === VALIDATE EVERY ITEM ===
      items.forEach((item, index) => {
        // === FIELD EXISTENCE CHECKS ===

        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('code');
        expect(item).toHaveProperty('billerCode');


        // === TYPE CHECKS ===
       
          // ✅ TypeScript now knows item is ElectricityCodesDto

          expect(typeof item.name).toBe('string');
          expect(typeof item.code).toBe('string');
          expect(typeof item.billerCode).toBe('string');

          console.log('Electricity code:', item);
        });
        

      // === SUMMARY LOG ===
      //console.log('Total items fetched:', items.length);



      //console.log('Biller Items:', items.length);
    }, 30000);
  });


});