import { describe, it, expect, beforeAll } from '@jest/globals';
import { DepositService } from '../../../src/services/wallet/deposit.service';
import { createTestWalletDeposit, requireApiKey } from '../../utils/test-setup';
import {
  FundWalletByNairaDto,
  VerifyBankAccountRequestDto,
  VerifyBvnDto,
  WalletDepositDto,
  WithdrawWalletDto
} from '../../../src/types';
import { AuthType, DEPOSIT_METHOD } from '../../../src/types/enums/deposit.enum';
import { AvsAddressDto, AvsDto, CreatePaymentLinkDto, DepositAuthorizationDto, DepositWithPaymentMethodDto, InitializeDepositDto } from '../../../src/types/deposit';

describe('WalletServiceAccount Integration Tests', () => {
  let walletService: DepositService;

  beforeAll(() => {
    if (!requireApiKey()) {
      return;
    }
    walletService = createTestWalletDeposit();
  });

  describe('depositFunds', () => {
      it('should deposit funds to wallet', async () => {
        if (!requireApiKey()) return;
  
        // Act
        const method: DEPOSIT_METHOD  = DEPOSIT_METHOD.CARD;
        const depositData: InitializeDepositDto = {
          amount: 1000,
          currency: "NGN",
          card: {
            "expiryMonth": "12",
            "expiryYear": "30",
            "cardNumber": "4242 4242 4242 4242",
            "cvv": "123",
            "cardHolderName": "John Doe"
          },
          reference: "unique-reference-009099",
          narration: "Payment transfer"

        };
        const result = await walletService.initializeDeposit(method, depositData);
        console.log('deposit wallet:', result);
  
        // Assert
        expect(result).toHaveProperty('amount');
        //expect(result).toHaveProperty('subwallets');
        //expect(Array.isArray(result.subwallets)).toBe(true);
        
        
      }, 30000);
    });

    describe('authorizeDeposit', () => {
      it('should authorize a deposit for user', async () => {
        if (!requireApiKey()) return;

        // Arrange

        const avsAddressData: AvsAddressDto = {

            city: 'sound city',
            country: 'nigeria',
            line1:'david street',
            line2:'ola avenue',
            postal_code: '423432',
            state: 'Lagos'


        }

        const avsData: AvsDto = {

            address: avsAddressData,

        }



        

        const authorizeData: DepositAuthorizationDto = {
          type: AuthType.PIN,
          reference: "unique-reference-00998",
          pin: "2584",
          otp: "123456",
          avs: avsData
        }
  

        const result = await walletService.authorizeDeposit(authorizeData);
        console.log('authorize deposit:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        
      }, 30000);
    });

    describe('createPaymentMethod', () => {
      it('should generate payment method id', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const paymentMethodData: paymentMethodDto = {
            
            type: 'CARD',
            subWalletId: '6b4fcf43-fcf4-4d3a-a2f9-41463f97db7b',
            card: {
              expiryMonth: "12",
              expiryYear: "30",
              cardNumber: "4242 4242 4242 4242",
              cvv: "123",
              cardHolderName: "John Doe"
            }
        }

        
        // Act
        const result = await walletService.createPaymentMethod(paymentMethodData);
        console.log('Retrieved wallet:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        
      }, 30000);
    });

    describe('createPayment', () => {
      it('should initiate a deposit with payment method id', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const paymentData: DepositWithPaymentMethodDto = {
            
            paymentMethodId: 'd1e490eb-d634-4399-b09c-7f73d7323a98',
            amount: 5000,
            reference: "unique-reference-00010",
            currency: "NGN",
            redirectUrl: "https://citizen.com",
            meta: {},
            narration: "Deposit to wallet"
        }

        
        // Act
        const result = await walletService.depositWithPaymentMethod(paymentData);
        console.log('make payment:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        
      }, 30000);
    });

    describe('getPaymentLink', () => {
      it('should get payment link for user', async () => {
        if (!requireApiKey()) return;

        // Arrange
      const paymentData: CreatePaymentLinkDto = {
        amount: 200,
        reference: "unique-reference-008996",
        redirectUrl: "https://citizen.com",
        customization: {
          title: "Citizen"
        }
      };
  
        // Act
        const result = await walletService.generatePaymentLink(paymentData);
        console.log('Payment link:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        
      }, 30000);
    });

    describe('getStatus', () => {
      it('should get payment status for user', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const reference = "unique-reference-002";
  
        // Act
        const result = await walletService.getStatus(reference);
        console.log('Status result:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        
      }, 30000);
    });

    describe('syncAccount', () => {
      it('should sync existing virtual as paymen method', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const subWalletId = "6b4fcf43-fcf4-4d3a-a2f9-41463f97db7b";
  
        // Act
        const result = await walletService.syncAccount(subWalletId);
        console.log('Sync Account Result:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');

        
      }, 30000);
    });

    describe('getUserPaymentMethod', () => {
      it('should get a list payment method for user', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const subWalletId = "6b4fcf43-fcf4-4d3a-a2f9-41463f97db7b";
  
        // Act
        const result = await walletService.getUserPaymentMethods(subWalletId);
        console.log('Payment Methods:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');



      }, 30000);
    });

    describe('getUserPaymentMethodDetails', () => {
      it('should get payment method details for user', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const id = "ad4fe7df-b026-4329-b488-a7b2546d2040";
  
        // Act
        const result = await walletService.getPaymentMethodDetails(id);
        console.log('Payment Method Details :', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');



      }, 30000);
    });

    describe('deleteUserPaymentMethod', () => {
      it('should delete a payment method for user', async () => {
        if (!requireApiKey()) return;
        // Arrange
        const paymentMethodId = "ad4fe7df-b026-4329-b488-a7b2546d2040";
        // Act
        const result = await walletService.deleteUserPaymentMethods(paymentMethodId);
        console.log('Delete Payment Method Response:', result);
        // Assert
        //expect(result).toHaveProperty('statusCode');
        //expect(result).toHaveProperty('message');
        //expect(result).toHaveProperty('data');
      }
      , 30000);
    });

    describe('setDefaultPaymentMethod', () => {
      it('should set default payment method for user', async () => {
        if (!requireApiKey()) return;

        // Arrange
        const paymentMethodId = "b02cf699-3ad9-4e2e-be6b-65c1c94210aa";
  
        // Act
        const result = await walletService.setDefaultPaymentMethod(paymentMethodId);
        console.log('default Payment Methods:', result);
  
        // Assert
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');



      }, 30000);
    });
  
});
