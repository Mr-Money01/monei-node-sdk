import { describe, it, expect, beforeAll } from '@jest/globals';
import { OfframpLedgerService } from '../../../src/services/offramp/ledger.service';
import { OfframpExchangeService } from '../../../src/services/offramp/exchange.service';
import { MoneiClient } from '../../../src/client/MoneiClient';
import { requireApiKey, createTestClient } from '../../utils/test-setup';
import {
  OfframpHistoryRequestDto,
  OfframpStatusRequestDto,
  OfframpAssets,
  OfframpNetworks,
  OfframpCurrency,
  OfframpStatus
} from '../../../src/types';

describe('OfframpLedgerService Integration Tests', () => {
  let offrampLedgerService: OfframpLedgerService;
  let offrampExchangeService: OfframpExchangeService;
  let client: MoneiClient;
  let testOrderReference: string;

  beforeAll(async () => {
    if (!requireApiKey()) {
      return;
    }
    client = createTestClient();
    offrampLedgerService = new OfframpLedgerService(client);
    offrampExchangeService = new OfframpExchangeService(client);

    // Create a test order to use for status checks
    try {
      const quoteRequest = {
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ethereum,
        amount: 100,
        fiat: OfframpCurrency.NGN
      };

      const quote = await offrampExchangeService.getQuote(quoteRequest);
      
      const initiateRequest = {
        amount: 100,
        token: OfframpAssets.USDT,
        network: OfframpNetworks.ethereum,
        fiatCurrency: OfframpCurrency.NGN,
        bankCode: 'GTBINGLA',
        accountNumber: '0123456789',
        accountName: 'John Doe'
      };

      const order = await offrampExchangeService.initiateSwap(initiateRequest);
      testOrderReference = order.data.reference;
      console.log('Created test order with reference:', testOrderReference);
    } catch (error) {
      console.warn('Could not create test order for ledger tests:', error);
    }
  });

  describe('getOfframpHistory', () => {
    it('should get offramp history with default pagination', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        // No limit or page - should use defaults
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);
      console.log('Retrieved offramp history:', JSON.stringify(result, null, 2));

      // Assert
      //expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('currentPage');
      expect(result.meta).toHaveProperty('itemsPerPage');
      expect(result.meta).toHaveProperty('totalItems');
      expect(result.meta).toHaveProperty('totalPages');

      console.log('History summary:', {
        totalTransactions: result.data.length,
        page: result.meta?.currentPage,
        limit: result.meta?.itemsPerPage,
        totalRecords: result.meta?.totalItems,
        totalPages: result.meta?.totalPages
      });

      // Check structure of first transaction if available
      if (result.data.length > 0) {
        const firstTx = result.data[0];
        expect(firstTx).toHaveProperty('id');
        expect(firstTx).toHaveProperty('reference');
        expect(firstTx).toHaveProperty('status');
        expect(firstTx).toHaveProperty('cryptoAmount');
        expect(firstTx).toHaveProperty('fiatAmount');
        expect(firstTx).toHaveProperty('exchangeRate');
        //expect(firstTx).toHaveProperty('fromCurrency');
        //expect(firstTx).toHaveProperty('toCurrency');
        expect(firstTx).toHaveProperty('createdAt');
        //expect(firstTx).toHaveProperty('updatedAt');
        //expect(firstTx).toHaveProperty('expiresAt');

        console.log('Sample transaction:', {
          id: firstTx.id,
          reference: firstTx.reference,
          status: firstTx.status,
          cryptoAmount: firstTx.cryptoAmount,
          fiatAmount: firstTx.fiatAmount,
          fromCurrency: firstTx.fromCurrency,
          toCurrency: firstTx.toCurrency
        });
      }
    }, 30000);

    it('should get offramp history with custom pagination', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '5',
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert
      //expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      expect(result.meta?.itemsPerPage).toBe(5);
      expect(result.meta?.currentPage).toBe("1");
      expect(result.data.length).toBeLessThanOrEqual(5);

      console.log('Paginated history:', {
        page: result.meta?.currentPage,
        limit: result.meta?.itemsPerPage,
        returnedCount: result.data.length,
        totalRecords: result.meta?.totalItems
      });
    }, 30000);

    it('should get offramp history with different page', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '3',
        page: '2'
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert
      //expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      expect(result.meta?.currentPage).toBe("2");
      expect(result.meta?.itemsPerPage).toBe(3);

      console.log('Page 2 results:', {
        page: result.meta?.currentPage,
        count: result.data.length,
        firstItem: result.data[0]?.reference
      });
    }, 30000);

    it('should handle empty history with valid pagination', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '10',
        page: '999' // Very high page number likely to be empty
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert
      //expect(result).toHaveProperty('statusCode');
      //expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.meta?.currentPage).toBe("999");
      
      console.log('Empty page result:', {
        page: result.meta?.currentPage,
        dataLength: result.data.length,
        totalPages: result.meta?.currentPages
      });
    }, 30000);

    /*
    it('should handle invalid limit gracefully', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '-1', // Invalid limit
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert - API should either use default limit or return error gracefully
      expect(result).toBeDefined();
      console.log('Response with invalid limit:', {
        //statusCode: result.statusCode,
        dataLength: result.data?.length,
        meta: result.meta
      });
    }, 30000);
    */

    it('should get history and verify transaction structure', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '10',
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert - verify all required fields exist in each transaction
      if (result.data.length > 0) {
        result.data.forEach((tx, index) => {
          expect(tx).toHaveProperty('id');
          expect(tx).toHaveProperty('reference');
          expect(tx).toHaveProperty('status');
          expect(tx).toHaveProperty('cryptoAmount');
          expect(tx).toHaveProperty('fiatAmount');
          expect(tx).toHaveProperty('exchangeRate');
          //expect(tx).toHaveProperty('fromCurrency');
          //expect(tx).toHaveProperty('toCurrency');
          expect(tx).toHaveProperty('createdAt');
          //expect(tx).toHaveProperty('updatedAt');
          //expect(tx).toHaveProperty('expiresAt');
          
          // Validate data types
          expect(typeof tx.cryptoAmount).toBe('number');
          expect(typeof tx.fiatAmount).toBe('number');
          expect(typeof tx.exchangeRate).toBe('number');
          expect(!isNaN(new Date(tx.createdAt).getTime())).toBe(true);
        });

        console.log(`Validated ${result.data.length} transactions successfully`);
      }
    }, 30000);
  });

  /*
  describe('getOfframpStatus', () => {
    it('should get status of existing offramp order', async () => {
      if (!requireApiKey() || !testOrderReference) {
        console.log('Skipping test: No test order reference available');
        return;
      }

      // Arrange
      const reference: OfframpStatusRequestDto = {
        reference: testOrderReference
      };

      // Act
      const result = await offrampLedgerService.trackOrder(reference);
      console.log('Retrieved order status:', JSON.stringify(result, null, 2));

      // Assert
      //expect(result).toHaveProperty('statusCode');
      //expect(result.status).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      // Check status data structure
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('reference');
      expect(result.data.reference).toBe(testOrderReference);
      expect(result.data).toHaveProperty('status');
      expect(result.data).toHaveProperty('cryptoAmount');
      expect(result.data).toHaveProperty('fiatAmount');
      expect(result.data).toHaveProperty('exchangeRate');
      expect(result.data).toHaveProperty('fromCurrency');
      expect(result.data).toHaveProperty('toCurrency');
      expect(result.data).toHaveProperty('createdAt');
      //expect(result.data).toHaveProperty('updatedAt');
      //expect(result.data).toHaveProperty('expiresAt');
      expect(result.data).toHaveProperty('completedAt');

      // Optional fields
      if (result.data.fees) {
        expect(typeof result.data.fees).toBe('object');
      }
      if (result.data.debitPaymentDetails) {
        expect(typeof result.data.debitPaymentDetails).toBe('object');
      }
      if (result.data.creditPaymentDetails) {
        expect(typeof result.data.creditPaymentDetails).toBe('object');
      }

      console.log('Order status details:', {
        id: result.data.id,
        reference: result.data.reference,
        status: result.data.status,
        cryptoAmount: result.data.cryptoAmount,
        fiatAmount: result.data.fiatAmount,
        exchangeRate: result.data.exchangeRate,
        createdAt: result.data.createdAt,
        updatedAt: result.data.updatedAt,
        expiresAt: result.data.expiresAt,
        completedAt: result.data.completedAt,
        fees: result.data.fees
      });
    }, 30000);

  
    it('should get status of multiple different orders', async () => {
      if (!requireApiKey()) return;

      // Create a few test orders to check status
      const references = [];

      // Create a second test order
      try {
        const quoteRequest = {
          token: OfframpAssets.USDC,
          network: OfframpNetworks.base,
          amount: 50,
          fiat: OfframpCurrency.NGN
        };

        const quote = await offrampExchangeService.getQuote(quoteRequest);
        
        const initiateRequest = {
          amount: 100,
          token: OfframpAssets.USDT,
          network: OfframpNetworks.base,
          fiatCurrency: OfframpCurrency.NGN,
          bankCode: 'GTBINGLA',
          accountNumber: '9876543210',
          accountName: 'Jane Smith'
        };

        const order = await offrampExchangeService.initiateSwap(initiateRequest);
        references.push(order.data.reference);
        console.log('Created second test order:', order.data.reference);
      } catch (error) {
        console.warn('Could not create second test order');
      }

      // Add the original reference if available
      if (testOrderReference) {
        references.push(testOrderReference);
      }

      // Check status of all references
      for (const ref of references) {
        const statusRequest: OfframpStatusRequestDto = {
          reference: ref
        };


        const result = await offrampLedgerService.trackOrder(statusRequest);
        
        //expect(result.statusCode).toBe(200);
        expect(result.data.reference).toBe(ref);
        
        console.log(`Status for ${ref}:`, {
          status: result.data.status,
        });
      }
    }, 60000);

    it('should handle non-existent order reference', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const nonExistentReference: OfframpStatusRequestDto = {
        reference: 'non-existent-ref-12345'
      };

      try {
        // Act
        const result = await offrampLedgerService.trackOrder(nonExistentReference);
        
        // Assert - if it doesn't throw, check for error structure
        //expect(result.statusCode).toBe(404); // or appropriate error code
        //expect(result.errors).toBeDefined();
        console.log('Expected error for non-existent reference:', result);
      } catch (error: any) {
        // Assert - if it throws
        expect(error).toBeDefined();
        console.log('Expected error caught:', error.message);
      }
    }, 30000);

    
   
  });
  */
 
  describe('getOfframpHistory with filters', () => {
    it('should get history and filter by status manually', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '20',
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert - manually filter and check statuses
      if (result.data.length > 0) {
        const pendingTxs = result.data.filter(tx => tx.status === OfframpStatus.pending);
        const completedTxs = result.data.filter(tx => tx.status === OfframpStatus.completed);
        const failedTxs = result.data.filter(tx => tx.status === OfframpStatus.failed);

        console.log('Transaction status breakdown:', {
          total: result.data.length,
          pending: pendingTxs.length,
          completed: completedTxs.length,
          failed: failedTxs.length,
          other: result.data.length - (pendingTxs.length + completedTxs.length + failedTxs.length)
        });

        // Validate all statuses are valid
        result.data.forEach(tx => {
          expect(Object.values(OfframpStatus).includes(tx.status)).toBe(true);
        });
      }
    }, 30000);

    it('should get history and analyze by currency', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '50',
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getTransactions(requestData);

      // Assert - analyze currency distribution
      if (result.data.length > 0) {
        const currencyMap = new Map();
        
        result.data.forEach(tx => {
          const key = `${tx.fromCurrency}->${tx.toCurrency}`;
          currencyMap.set(key, (currencyMap.get(key) || 0) + 1);
        });

        console.log('Currency pair distribution:');
        currencyMap.forEach((count, pair) => {
          console.log(`  ${pair}: ${count} transactions`);
        });

        // Verify all amounts are positive
        result.data.forEach(tx => {
          expect(tx.cryptoAmount).toBeGreaterThan(0);
          expect(tx.fiatAmount).toBeGreaterThan(0);
          expect(tx.exchangeRate).toBeGreaterThan(0);
        });
      }
    }, 30000);
  });

});