import { MoneiClient } from '../../client/MoneiClient';
import { PeerTransferDto, WithdrawWalletDto } from '../../types';

export class WalletServicePayouts {
    constructor(private client: MoneiClient) { }

    async withdrawFromWallet(withdrawData: WithdrawWalletDto): Promise<any> {
        return this.client.post('/api/v1/wallet/payout/withdrawal', withdrawData);
    }

    async peerTransfer(transferData: PeerTransferDto): Promise<any> {
        return this.client.post('/api/v1/wallet/payout/transfer', transferData);
    }


}