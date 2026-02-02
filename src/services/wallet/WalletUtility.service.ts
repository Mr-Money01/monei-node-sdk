import { MoneiClient } from '../../client/MoneiClient';
import {
    BankAccountResponseDto, BankListResponseDto,
    VerifyBankAccountRequestDto,
} from '../../types';

export class WalletUtilityService {
    constructor(private client: MoneiClient) { }

    async getBanks(): Promise<BankListResponseDto> {
        return this.client.get<BankListResponseDto>('/api/v1/wallet/utils/banks');
    }

    async verifyBankAccount(verifyData: VerifyBankAccountRequestDto): Promise<BankAccountResponseDto> {
        return this.client.post<BankAccountResponseDto>('/api/v1/wallet/utils/verify-bank-account', verifyData);
    }


}