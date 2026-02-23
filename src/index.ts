import { MoneiClient } from './client/MoneiClient';
import { MoneiConfig } from './types';
import {
  UserService,
  WalletService,
  DepositService,
  WalletAccountService,
  PayoutService,
  WalletUtilityService,
  PaymentMethodService,
  EvmService,
  SolanaService,
  TransactionService,
  AgentService,
  BillService,
  ExchangeService,
  wallet
} from './services';

export class MoneiSDK {
  public user: UserService;
  public wallet: WalletService;
  public deposit: DepositService;
  public walletAccount: WalletAccountService;
  public payout: PayoutService;
  public walletUtility: WalletUtilityService;
  public paymentMethod: PaymentMethodService;
  public evm: EvmService;
  public solana: SolanaService;
  public transactions: TransactionService;
  //public agent: AgentService;
  public bills: BillService;
  public exchange: ExchangeService;

  private client: MoneiClient;

  constructor(config: MoneiConfig) {
    this.client = new MoneiClient(config);

    // Initialize all services
    this.user = new UserService(this.client);
    this.wallet = new WalletService(this.client);
    this.deposit = new DepositService(this.client);
    this.walletAccount = new WalletAccountService(this.client);
    this.payout = new PayoutService(this.client);
    this.walletUtility = new WalletUtilityService(this.client);
    this.paymentMethod = new PaymentMethodService(this.client);
    this.evm = new EvmService(this.client);
    this.solana = new SolanaService(this.client);
    this.transactions = new TransactionService(this.client);
    //this.agent = new AgentService(this.client);
    this.bills = new BillService(this.client);
    this.exchange = new ExchangeService(this.client);
  }

  // Helper methods for authentication
  setBearerToken(token: string): void {
    this.client.setBearerToken(token);
  }

  removeBearerToken(): void {
    this.client.removeBearerToken();
  }

  setApiKey(apiKey: string): void {
    this.client.setApiKey(apiKey);
  }
}

// Export all types
export * from './types';
export * from './errors/MoneiError';

export default MoneiSDK;

