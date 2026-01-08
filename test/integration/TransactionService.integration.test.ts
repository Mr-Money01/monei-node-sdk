import { describe, it, expect, beforeAll } from '@jest/globals';
import { TransactionService } from '../../src/services/TransactionService';
import { createTestTransactionService, requireApiKey } from '../utils/test-setup';
import {
    UserTransactionsResponseDto,
    TransactionDto,
    TransactionResponseDto,
    UserTransactionsDataDto
} from '../../src/types';

describe('TransactionService Integration Tests', () => {
    let transactionService: TransactionService;

    beforeAll(() => {
        if (!requireApiKey()) return;
        transactionService = createTestTransactionService();
    });

    // ---------------------------------------------------------
    // GET USER TRANSACTIONS
    // ---------------------------------------------------------
    describe('getUserTransactions', () => {
        it('should fetch all user transactions', async () => {
            if (!requireApiKey()) return;

            const result: UserTransactionsResponseDto =
                await transactionService.getUserTransactions();

            // Base response structure
            expect(result).toHaveProperty('statusCode');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('data');

            

            const transactionsData: UserTransactionsDataDto = result.data;

            expect(transactionsData).toHaveProperty('transactions');
            expect(transactionsData).toHaveProperty('pagination');


            const transactions: TransactionResponseDto[] = transactionsData.transactions;

            console.log('Fetched Transactions:', transactions);

            expect(Array.isArray(transactions)).toBe(true);

            transactions.forEach((tx, index) => {

                expect(tx).toHaveProperty('id');
                expect(tx).toHaveProperty('userId');
                expect(tx).toHaveProperty('type');
                expect(tx).toHaveProperty('amount');
                expect(tx).toHaveProperty('status');
                expect(tx).toHaveProperty('reference');
                expect(tx).toHaveProperty('createdAt');
                // Type checks
                expect(typeof tx.id).toBe('string');
                expect(typeof tx.userId).toBe('string');
                expect(typeof tx.type).toBe('string');
                //expect(typeof tx.amount).toBe('number');
                expect(typeof tx.status).toBe('string');
                expect(typeof tx.reference).toBe('string');
                expect(typeof tx.createdAt).toBe('string');

                // === LOG SUCCESS ===
                console.log('User Transaction:', {
                    id: tx.id,
                    amount: tx.amount,
                    type: tx.type,
                    ref: tx.reference,
                    status: tx.status
                });
            });

            console.log('User Transaction Count:', transactions.length);
        }, 30000);
    });

    // ---------------------------------------------------------
    // GET TRANSACTION BY ID
    // ---------------------------------------------------------
    describe('getTransactionById', () => {
        it('should fetch a transaction by ID', async () => {
            if (!requireApiKey()) return;

            // 1. Fetch ALL user transactions
            const all: UserTransactionsResponseDto = await transactionService.getUserTransactions();

            const transactionsData: UserTransactionsDataDto = all.data;

            expect(transactionsData).toHaveProperty('transactions');
            expect(transactionsData).toHaveProperty('pagination');

            const transactions: TransactionResponseDto[] = transactionsData.transactions;

            if (!transactions.length) {
                console.warn('No transactions found. Skipping test.');
                return;
            }

            console.log(`Total transactions found: ${transactions.length}`);

            const id = transactions[0].id;

            const fetched: TransactionDto =
                await transactionService.getTransactionById(id);

            // === Validate structure ===
            expect(fetched).toHaveProperty('id');
            expect(fetched).toHaveProperty('user');
            expect(fetched).toHaveProperty('type');
            expect(fetched).toHaveProperty('amount');
            expect(fetched).toHaveProperty('status');
            expect(fetched).toHaveProperty('reference');
            expect(fetched).toHaveProperty('createdAt');

            // === Validate correctness ===
            expect(fetched.id).toBe(id);

            // Type checks
                expect(typeof fetched.id).toBe('string');
                expect(typeof fetched.user).toBe('object');
                expect(typeof fetched.type).toBe('string');
                //expect(typeof fetched.amount).toBe('number');
                expect(typeof fetched.status).toBe('string');
                expect(typeof fetched.reference).toBe('string');
                expect(typeof fetched.createdAt).toBe('string');

            // === LOG SUCCESS ===
            console.log('User Transaction:', {
                id: fetched.id,
                user: fetched.user,
                amount: fetched.amount,
                type: fetched.type,
                ref: fetched.reference,
                status: fetched.status
            });

            console.log(`Validated transaction ID: ${id}`);

        }, 60000);
    });

    // ---------------------------------------------------------
    // GET TRANSACTION BY REFERENCE
    // ---------------------------------------------------------
    describe('getTransactionByReference', () => {
        it('should fetch a transaction by reference', async () => {
            if (!requireApiKey()) return;

            // Get a real reference from user transactions
            // 1. Fetch ALL user transactions
            const all: UserTransactionsResponseDto = await transactionService.getUserTransactions();

            const transactionsData: UserTransactionsDataDto = all.data;

            expect(transactionsData).toHaveProperty('transactions');
            expect(transactionsData).toHaveProperty('pagination');

            const transactions: TransactionResponseDto[] = transactionsData.transactions;

            if (!transactions.length) {
                console.warn('No transactions found. Skipping test.');
                return;
            }

            console.log(`Total transactions found: ${transactions.length}`);

            // 2. Loop through ALL transactions
            const ref = transactions[2].reference;

            console.log(`Using transaction Reference: ${ref} for test.`);

            const fetched: TransactionDto =
                await transactionService.getTransactionByReference(ref);

            console.log('Fetched Transaction by Reference:', fetched);

            // === Validate structure ===
            expect(fetched).toHaveProperty('id');
            expect(fetched).toHaveProperty('user');
            expect(fetched).toHaveProperty('type');
            expect(fetched).toHaveProperty('amount');
            expect(fetched).toHaveProperty('status');
            expect(fetched).toHaveProperty('reference');
            expect(fetched).toHaveProperty('createdAt');

            // === Validate correctness ===
            expect(fetched.reference).toBe(ref);

            // Type checks
                expect(typeof fetched.id).toBe('string');
                expect(typeof fetched.user).toBe('object');
                expect(typeof fetched.type).toBe('string');
                //expect(typeof fetched.amount).toBe('number');
                expect(typeof fetched.status).toBe('string');
                expect(typeof fetched.reference).toBe('string');
                expect(typeof fetched.createdAt).toBe('string');

            // === LOG SUCCESS ===
            console.log('User Transaction:', {
                id: fetched.id,
                user: fetched.user,
                amount: fetched.amount,
                type: fetched.type,
                ref: fetched.reference,
                status: fetched.status
            });

            console.log(`Validated transaction Reference: ${ref}`);



        }, 30000);
    });
});
