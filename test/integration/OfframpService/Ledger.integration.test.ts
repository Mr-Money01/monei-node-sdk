import { describe, it, expect, beforeAll } from '@jest/globals';
import { OfframpLedgerService } from '../../../src/services/offramp/OfframpLedger.service';
import { OfframpExchangeService } from '../../../src/services/offramp/OfframpExchange.service';
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
        network: OfframpNetworks.ETHEREUM,
        amount: '100',
        fiat: OfframpCurrency.NGN
      };

      const quote = await offrampExchangeService.getCryptoToFiatQuote(quoteRequest);
      
      const initiateRequest = {
        amount: quote.data.amount,
        token: quote.data.token,
        network: quote.data.network,
        fiatCurrency: quote.data.fiat,
        bankCode: '058',
        accountNumber: '0123456789',
        accountName: 'John Doe'
      };

      const order = await offrampExchangeService.initiate(initiateRequest);
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
      const result = await offrampLedgerService.getOfframpHistory(requestData);
      console.log('Retrieved offramp history:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('page');
      expect(result.meta).toHaveProperty('limit');
      expect(result.meta).toHaveProperty('total');
      expect(result.meta).toHaveProperty('pages');

      console.log('History summary:', {
        totalTransactions: result.data.length,
        page: result.meta.page,
        limit: result.meta.limit,
        totalRecords: result.meta.total,
        totalPages: result.meta.pages
      });

      // Check structure of first transaction if available
      if (result.data.length > 0) {
        const firstTx = result.data[0];
        expect(firstTx).toHaveProperty('id');
        expect(firstTx).toHaveProperty('internalReference');
        expect(firstTx).toHaveProperty('provider');
        expect(firstTx).toHaveProperty('providerTransactionId');
        expect(firstTx).toHaveProperty('status');
        expect(firstTx).toHaveProperty('cryptoAmount');
        expect(firstTx).toHaveProperty('fiatAmount');
        expect(firstTx).toHaveProperty('exchangeRate');
        expect(firstTx).toHaveProperty('fromCurrency');
        expect(firstTx).toHaveProperty('toCurrency');
        expect(firstTx).toHaveProperty('createdAt');
        expect(firstTx).toHaveProperty('updatedAt');
        expect(firstTx).toHaveProperty('expiresAt');

        console.log('Sample transaction:', {
          id: firstTx.id,
          reference: firstTx.internalReference,
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
      const result = await offrampLedgerService.getOfframpHistory(requestData);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result.meta.limit).toBe(5);
      expect(result.meta.page).toBe(1);
      expect(result.data.length).toBeLessThanOrEqual(5);

      console.log('Paginated history:', {
        page: result.meta.page,
        limit: result.meta.limit,
        returnedCount: result.data.length,
        totalRecords: result.meta.total
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
      const result = await offrampLedgerService.getOfframpHistory(requestData);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(3);

      console.log('Page 2 results:', {
        page: result.meta.page,
        count: result.data.length,
        firstItem: result.data[0]?.internalReference
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
      const result = await offrampLedgerService.getOfframpHistory(requestData);

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.meta.page).toBe(999);
      
      console.log('Empty page result:', {
        page: result.meta.page,
        dataLength: result.data.length,
        totalPages: result.meta.pages
      });
    }, 30000);

    it('should handle invalid limit gracefully', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '-1', // Invalid limit
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getOfframpHistory(requestData);

      // Assert - API should either use default limit or return error gracefully
      expect(result).toBeDefined();
      console.log('Response with invalid limit:', {
        statusCode: result.statusCode,
        dataLength: result.data?.length,
        meta: result.meta
      });
    }, 30000);

    it('should get history and verify transaction structure', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '10',
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getOfframpHistory(requestData);

      // Assert - verify all required fields exist in each transaction
      if (result.data.length > 0) {
        result.data.forEach((tx, index) => {
          expect(tx).toHaveProperty('id');
          expect(tx).toHaveProperty('internalReference');
          expect(tx).toHaveProperty('provider');
          expect(tx).toHaveProperty('providerTransactionId');
          expect(tx).toHaveProperty('status');
          expect(tx).toHaveProperty('cryptoAmount');
          expect(tx).toHaveProperty('fiatAmount');
          expect(tx).toHaveProperty('exchangeRate');
          expect(tx).toHaveProperty('fromCurrency');
          expect(tx).toHaveProperty('toCurrency');
          expect(tx).toHaveProperty('createdAt');
          expect(tx).toHaveProperty('updatedAt');
          expect(tx).toHaveProperty('expiresAt');
          
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
      const result = await offrampLedgerService.getOfframpStatus(reference);
      console.log('Retrieved order status:', JSON.stringify(result, null, 2));

      // Assert
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      
      // Check status data structure
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('internalReference');
      expect(result.data.internalReference).toBe(testOrderReference);
      expect(result.data).toHaveProperty('provider');
      expect(result.data).toHaveProperty('providerTransactionId');
      expect(result.data).toHaveProperty('status');
      expect(result.data).toHaveProperty('cryptoAmount');
      expect(result.data).toHaveProperty('fiatAmount');
      expect(result.data).toHaveProperty('exchangeRate');
      expect(result.data).toHaveProperty('fromCurrency');
      expect(result.data).toHaveProperty('toCurrency');
      expect(result.data).toHaveProperty('createdAt');
      expect(result.data).toHaveProperty('updatedAt');
      expect(result.data).toHaveProperty('expiresAt');
      expect(result.data).toHaveProperty('providerStatus');
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
        reference: result.data.internalReference,
        status: result.data.status,
        providerStatus: result.data.providerStatus,
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
          network: OfframpNetworks.POLYGON,
          amount: '50',
          fiat: OfframpCurrency.NGN
        };

        const quote = await offrampExchangeService.getCryptoToFiatQuote(quoteRequest);
        
        const initiateRequest = {
          amount: quote.data.amount,
          token: quote.data.token,
          network: quote.data.network,
          fiatCurrency: quote.data.fiat,
          bankCode: '044',
          accountNumber: '9876543210',
          accountName: 'Jane Smith'
        };

        const order = await offrampExchangeService.initiate(initiateRequest);
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

        const result = await offrampLedgerService.getOfframpStatus(statusRequest);
        
        expect(result.statusCode).toBe(200);
        expect(result.data.internalReference).toBe(ref);
        
        console.log(`Status for ${ref}:`, {
          status: result.data.status,
          providerStatus: result.data.providerStatus
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
        const result = await offrampLedgerService.getOfframpStatus(nonExistentReference);
        
        // Assert - if it doesn't throw, check for error structure
        expect(result.statusCode).toBe(404); // or appropriate error code
        expect(result.errors).toBeDefined();
        console.log('Expected error for non-existent reference:', result.errors);
      } catch (error: any) {
        // Assert - if it throws
        expect(error).toBeDefined();
        console.log('Expected error caught:', error.message);
      }
    }, 30000);

    it('should track status progression over time', async () => {
      if (!requireApiKey() || !testOrderReference) {
        console.log('Skipping test: No test order reference available');
        return;
      }

      // Check status multiple times to see progression
      const statuses = [];
      
      for (let i = 0; i < 3; i++) {
        const statusRequest: OfframpStatusRequestDto = {
          reference: testOrderReference
        };

        const result = await offrampLedgerService.getOfframpStatus(statusRequest);
        statuses.push({
          attempt: i + 1,
          status: result.data.status,
          providerStatus: result.data.providerStatus,
          updatedAt: result.data.updatedAt
        });

        // Wait a bit between checks (if needed)
        if (i < 2) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      console.log('Status progression:', statuses);
      
      // Validate that statuses are valid enum values
      statuses.forEach(status => {
        expect(Object.values(OfframpStatus).includes(status.status)).toBe(true);
      });
    }, 60000);
  });

  describe('getOfframpHistory with filters', () => {
    it('should get history and filter by status manually', async () => {
      if (!requireApiKey()) return;

      // Arrange
      const requestData: OfframpHistoryRequestDto = {
        limit: '20',
        page: '1'
      };

      // Act
      const result = await offrampLedgerService.getOfframpHistory(requestData);

      // Assert - manually filter and check statuses
      if (result.data.length > 0) {
        const pendingTxs = result.data.filter(tx => tx.status === OfframpStatus.PENDING);
        const completedTxs = result.data.filter(tx => tx.status === OfframpStatus.COMPLETED);
        const failedTxs = result.data.filter(tx => tx.status === OfframpStatus.FAILED);

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
      const result = await offrampLedgerService.getOfframpHistory(requestData);

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

  describe('combined ledger operations', () => {
    it('should get history and then check status of first transaction', async () => {
      if (!requireApiKey()) return;

      // Step 1: Get history
      const historyRequest: OfframpHistoryRequestDto = {
        limit: '1',
        page: '1'
      };

      const history = await offrampLedgerService.getOfframpHistory(historyRequest);
      
      if (history.data.length > 0) {
        const firstTx = history.data[0];
        console.log('Step 1: Retrieved first transaction:', firstTx.internalReference);

        // Step 2: Check detailed status of that transaction
        const statusRequest: OfframpStatusRequestDto = {
          reference: firstTx.internalReference
        };

        const status = await offrampLedgerService.getOfframpStatus(statusRequest);
        console.log('Step 2: Retrieved detailed status');

        // Assert
        expect(status.data.internalReference).toBe(firstTx.internalReference);
        expect(status.data.id).toBe(firstTx.id);
        expect(status.data.cryptoAmount).toBe(firstTx.cryptoAmount);
        expect(status.data.fiatAmount).toBe(firstTx.fiatAmount);
        expect(status.data.exchangeRate).toBe(firstTx.exchangeRate);
        expect(status.data.status).toBe(firstTx.status);

        console.log('Combined operation successful:', {
          reference: status.data.internalReference,
          historyStatus: firstTx.status,
          detailStatus: status.data.status,
          hasFees: !!status.data.fees,
          hasPaymentDetails: !!(status.data.debitPaymentDetails || status.data.creditPaymentDetails)
        });
      } else {
        console.log('No transactions found for combined test');
      }
    }, 30000);

    it('should verify history matches status for multiple transactions', async () => {
      if (!requireApiKey()) return;

      // Get a few transactions from history
      const historyRequest: OfframpHistoryRequestDto = {
        limit: '3',
        page: '1'
      };

      const history = await offrampLedgerService.getOfframpHistory(historyRequest);
      
      if (history.data.length > 0) {
        for (const tx of history.data) {
          const statusRequest: OfframpStatusRequestDto = {
            reference: tx.internalReference
          };

          const status = await offrampLedgerService.getOfframpStatus(statusRequest);

          // Verify consistency
          expect(status.data.internalReference).toBe(tx.internalReference);
          expect(status.data.id).toBe(tx.id);
          expect(status.data.status).toBe(tx.status);
          expect(status.data.cryptoAmount).toBe(tx.cryptoAmount);
          expect(status.data.fiatAmount).toBe(tx.fiatAmount);
          expect(status.data.exchangeRate).toBe(tx.exchangeRate);

          console.log(`Transaction ${tx.internalReference}:`, {
            historyStatus: tx.status,
            detailStatus: status.data.status,
            consistent: tx.status === status.data.status
          });
        }
      }
    }, 60000);
  });
});