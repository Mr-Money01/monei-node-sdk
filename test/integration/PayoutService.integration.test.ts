import { PaymentMethodService } from '../../src/services/PaymentMethodService';
import { PaymentMethodType } from '../../src/types/enums/payment-method';
import { PaymentMethodDto } from '../../src/types/payment-method';
import { createPaymentMethodService, requireApiKey } from '../utils/test-setup';


describe('Payment Method Service Test', () => {
    let paymentMethodService: PaymentMethodService

    beforeAll(() => {
        if (!requireApiKey()) {
            return;
        }
        paymentMethodService = createPaymentMethodService();
    });

    describe('createPaymentMethod', () => {
        it('should generate payment method id', async () => {
            if (!requireApiKey()) return;

            const paymentMethodData: PaymentMethodDto = {
                type: PaymentMethodType.CARD,
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
            const result = await paymentMethodService.createPaymentMethod(paymentMethodData);
            console.log('Retrieved wallet:', result);

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
            const result = await paymentMethodService.getUserPaymentMethods(subWalletId);
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
            const result = await paymentMethodService.getPaymentMethodDetails(id);
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
            const result = await paymentMethodService.deleteUserPaymentMethods(paymentMethodId);
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
            const result = await paymentMethodService.setDefaultPaymentMethod(paymentMethodId);
            console.log('default Payment Methods:', result);

            // Assert
            expect(result).toHaveProperty('statusCode');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('data');



        }, 30000);
    });

})