import { MoneiClient } from '../../client/MoneiClient';
import { ResponseDto } from '../../types';
import { BankTransferRequestDto, BankTransferResponseDto, PeerTransferDto } from '../../types/payout';

export class PayoutService {
    constructor(private client: MoneiClient) { }

    async bankTransfer(data: BankTransferRequestDto): Promise<BankTransferResponseDto> {
        return this.client.post(`/api/v1/wallet/payout/bank-transfer`, data)
    }

    async peerTransfer(transferData: PeerTransferDto): Promise<ResponseDto> {
        return this.client.post('/api/v1/wallet/payout/transfer', transferData);
    }


}