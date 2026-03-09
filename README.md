# Monei Node.js SDK

The official Node.js/TypeScript SDK for the Monei API — providing seamless integration with Monei's comprehensive financial services platform, including fiat wallets, crypto operations, bill payments, offramp, and exchanges.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Available Services](#available-services)
- [Service Reference](#service-reference)
  - [User Service](#user-service)
  - [Wallet Account Service](#wallet-account-service)
  - [Deposit Service](#deposit-service)
  - [Payout Service](#payout-service)
  - [Wallet Utility Service](#wallet-utility-service)
  - [Payment Method Service](#payment-method-service)
  - [Transaction Service](#transaction-service)
  - [EVM Service](#evm-service)
  - [Solana Service](#solana-service)
  - [Exchange Service](#exchange-service)
  - [Bills – Discovery Service](#bills--discovery-service)
  - [Bills – Pay Service](#bills--pay-service)
  - [Bills – Validation Service](#bills--validation-service)
  - [Bills – Records Service](#bills--records-service)
  - [Offramp – Exchange Service](#offramp--exchange-service)
  - [Offramp – Payout Service](#offramp--payout-service)
  - [Offramp – Ledger Service](#offramp--ledger-service)
  - [Business Service](#business-service)
  - [Agent Service](#agent-service)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)
- [Chain IDs & Networks](#chain-ids--networks)
- [Getting Help](#getting-help)
- [License](#license)

---

## Installation

```bash
npm install monei-sdk
```

---

## Quick Start

```typescript
import MoneiSDK from 'monei-sdk';

const sdk = new MoneiSDK({
  apiKey: process.env.MONEI_API_KEY!
});

const user = await sdk.user.getCurrentUser();
console.log(`Welcome, ${user.data.firstName}!`);

const wallet = await sdk.walletAccount.me();
console.log(`Naira Balance: ₦${wallet.data.nairaBalance}`);
```

---

## Configuration

```typescript
interface MoneiConfig {
  apiKey: string;      // Required — your Monei API key
  baseUrl?: string;    // Optional — defaults to https://api.monei.cc
  timeout?: number;    // Optional — request timeout in ms (default: 30000)
}

const sdk = new MoneiSDK({
  apiKey: process.env.MONEI_API_KEY!,
  baseUrl: process.env.MONEI_BASE_URL || 'https://api.monei.cc',
  timeout: 30000
});
```

---

## Authentication

Get your API key from the [Monei Dashboard](https://monei.cc). Always store credentials in environment variables — never hardcode them.

```typescript
// Set API key (set at initialization or update later)
sdk.setApiKey('your-api-key');

// Set a bearer token (e.g. for user-scoped requests)
sdk.setBearerToken('your-bearer-token');

// Remove bearer token
sdk.removeBearerToken();
```

---

## Available Services

| Property | Description |
|---|---|
| `sdk.user` | User profile and KYC |
| `sdk.walletAccount` | Wallet overview and virtual accounts |
| `sdk.deposit` | Fiat deposit operations |
| `sdk.payout` | Bank and peer payouts |
| `sdk.walletUtility` | Banks list and account verification |
| `sdk.paymentMethod` | Saved payment methods management |
| `sdk.transactions` | Transaction history and lookup |
| `sdk.evm` | EVM blockchain wallet operations |
| `sdk.solana` | Solana blockchain wallet operations |
| `sdk.exchange` | Crypto token swaps (EVM + Solana) |
| `sdk.billsDiscovery` | Discover billers and products |
| `sdk.billsPay` | Pay airtime, data, electricity, cable TV |
| `sdk.billsValidation` | Validate bill customers |
| `sdk.billsRecords` | Bill payment history and receipts |
| `sdk.offrampExchange` | Crypto-to-fiat quotes and swaps |
| `sdk.offrampPayouts` | Offramp bank listing and verification |
| `sdk.offrampLedger` | Offramp transaction history and tracking |
| `sdk.business` | Business customer management |

---

## Service Reference

### User Service

```typescript
// Get the currently authenticated user's profile
const user = await sdk.user.getCurrentUser();
// Returns: UserResponseDto


// Get KYC status
const kyc = await sdk.user.kycStatus();
// Returns: KycStatusDto

// Get deposit and transaction limits
const limits = await sdk.user.getDepositLimit();
```

---

### Wallet Account Service

```typescript
// Get full wallet overview (NGN balance + all subwallets including EVM/Solana portfolios)
const wallet = await sdk.walletAccount.me();
// Optional: pass a chainId to filter EVM portfolio by chain
const walletOnBsc = await sdk.walletAccount.me(56);
// Returns: UserWalletResponseDto

// Create a virtual account (NIN required)
const virtualAccount = await sdk.walletAccount.createVirtualAccount({
  nin: '12345678901',
  reference: 'optional-ref'
});
// Returns: VirtualAccountResponseDto
```

---

### Deposit Service

```typescript
import { DEPOSIT_METHOD } from 'monei-sdk';

// Initialize a deposit via bank transfer, USSD, or card
const deposit = await sdk.deposit.initializeDeposit(DEPOSIT_METHOD.BANK_TRANSFER, {
  amount: 10000,
  currency: 'NGN',
  narration: 'Wallet top-up'
});
// Returns: PaymentResponseDto

// Deposit using a saved payment method
const pmDeposit = await sdk.deposit.depositWithPaymentMethod({
  amount: 5000,
  paymentMethodId: 'pm_abc123',
  reference: 'ref_001',
  currency: 'NGN',
  redirectUrl: 'https://yourapp.com/callback',
  meta: {},
  narration: 'Top-up via saved card'
});

// Authorize a deposit (PIN, OTP, AVS)
await sdk.deposit.authorizeDeposit({
  type: 'otp',
  reference: 'ref_001',
  otp: '123456',
  pin: '',
  avs: { address: { city: '', country: '', line1: '', line2: '', postal_code: '', state: '' } }
});

// Generate a standalone payment link to share with a customer
const link = await sdk.deposit.generatePaymentLink({
  amount: 5000,
  redirectUrl: 'https://yourapp.com/success',
  customer: {
    email: 'customer@example.com',
    phoneNumber: '08012345678',
    name: 'John Doe'
  }
});
console.log(link.data.link);

// Check the status of a deposit by reference
const status = await sdk.deposit.getStatus('ref_001');
```

---

### Payout Service

```typescript
// Send money to a bank account
const transfer = await sdk.payout.bankTransfer({
  amount: 5000,
  bank: '058',              // Bank code
  accountNumber: '1234567890',
  transactionPin: '1234',
  narration: 'Payment for services',
  reference: 'optional-ref'
});
// Returns: BankTransferResponseDto

// Peer-to-peer transfer to another Monei user
const peer = await sdk.payout.peerTransfer({
  receiver: 'user@example.com',
  amount: 2000,
  transactionPin: '1234',
  currency: 'NGN'
});
```

---

### Wallet Utility Service

```typescript
// Get list of supported Nigerian banks
const banks = await sdk.walletUtility.getBanks();
// Returns: BankListResponseDto — array of { id, code, name }

// Verify a bank account and retrieve the account name
const account = await sdk.walletUtility.verifyBankAccount({
  accountNumber: '1234567890',
  bank: '058'
});
console.log(account.data.accountName);
// Returns: BankAccountResponseDto
```

---

### Payment Method Service

```typescript
// Get all saved payment methods for a subwallet
const methods = await sdk.paymentMethod.getAll('subwallet-id');

// Add a new payment method (card, virtual account, USSD, etc.)
const created = await sdk.paymentMethod.create({
  type: 'CARD',
  subWalletId: 'subwallet-id',
  card: {
    cardNumber: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2026',
    cvv: '123',
    cardHolderName: 'John Doe'
  }
});

// Get a specific payment method
const method = await sdk.paymentMethod.get('pm-id');

// Set a payment method as default
await sdk.paymentMethod.setDefault('pm-id');

// Delete a payment method
await sdk.paymentMethod.delete('pm-id');
```

---

### Transaction Service

```typescript
// Get full transaction history for the authenticated user
const history = await sdk.transactions.getUserTransactions();
// Returns: UserTransactionsResponseDto — includes transactions array + pagination

// Get transactions filtered by type
import { TransactionType } from 'monei-sdk';
const credits = await sdk.transactions.getTransactionsByType(TransactionType.CREDIT);
const debits  = await sdk.transactions.getTransactionsByType(TransactionType.DEBIT);

// Get only deposit (credit) transactions
const deposits = await sdk.transactions.getDeposits();

// Fetch a single transaction by ID
const tx = await sdk.transactions.getById('txn-id');

// Fetch a single transaction by reference
const txByRef = await sdk.transactions.getByReference('ref-001');

// Smart lookup — by either ID or reference
const txSmart = await sdk.transactions.getDeposit({ id: 'txn-id' });
const txSmart2 = await sdk.transactions.getDeposit({ reference: 'ref-001' });
```

---

### EVM Service

```typescript
// Get all supported EVM networks
const networks = await sdk.evm.getSupportedNetworks();
// Returns: SupportedNetworkResponseDto

// Get full EVM portfolio for a specific chain
const portfolio = await sdk.evm.getPortfolio(56); // BSC
console.log(`Portfolio value: $${portfolio.data.totalPortfolioValueUSD}`);

// Get native token balance (ETH, BNB, MATIC, etc.)
const nativeBal = await sdk.evm.getNativeBalance(1); // Ethereum

// Get ERC-20 token balance
const tokenBal = await sdk.evm.getTokenBalance(
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  1
);

// Send native token
const nativeTx = await sdk.evm.sendNativeToken({
  to: '0xRecipientAddress',
  amount: '0.01',
  chainId: 1
});
console.log(nativeTx.data.txHash);

// Send ERC-20 token
const tokenTx = await sdk.evm.sendToken({
  to: '0xRecipientAddress',
  tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  amount: '100',
  chainId: 1
});
```

---

### Solana Service

```typescript
// Get the user's Solana wallet address
const address = await sdk.solana.getWalletAddress();
console.log(address.data.address);

// Get native SOL balance
const solBal = await sdk.solana.getNativeBalance('mainnet-beta');

// Get SPL token balance
const tokenBal = await sdk.solana.getTokenBalance(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC mint
  'mainnet-beta'
);

// Get full Solana portfolio
const portfolio = await sdk.solana.getPortfolio('mainnet-beta');
console.log(`SOL Balance: ${portfolio.data.nativeBalance}`);

// Transfer SOL
const solTx = await sdk.solana.sendNativeToken({
  to: 'RecipientPublicKey',
  amount: '1.5',
  network: 'mainnet-beta'
});
console.log(solTx.data.signature);

// Transfer SPL token
const splTx = await sdk.solana.sendToken({
  to: 'RecipientPublicKey',
  tokenMintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  amount: '50',
  network: 'mainnet-beta'
});
```

---

### Exchange Service

EVM swaps are powered by 0x Protocol. Solana swaps use Jupiter.

```typescript
// ── EVM ──────────────────────────────────────────

// Get a quote: native token → ERC-20
const nativeToTokenQuote = await sdk.exchange.getNativeToTokenPrice({
  amount: '0.1',
  tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  chainId: 1
});

// Execute swap: native → ERC-20
const nativeToToken = await sdk.exchange.swapNativeToToken({
  amount: '0.1',
  tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  chainId: 1
});
console.log(nativeToToken.data.txHash);

// Get a quote: ERC-20 → ERC-20
const tokenToTokenQuote = await sdk.exchange.getTokenToTokenPrice({
  tokenIn: '0xTokenInAddress',
  tokenOut: '0xTokenOutAddress',
  amount: '100',
  chainId: 1
});

// Execute swap: ERC-20 → ERC-20
await sdk.exchange.swapTokenToToken({ tokenIn: '0x...', tokenOut: '0x...', amount: '100', chainId: 1 });

// Get a quote: ERC-20 → native
const tokenToNativeQuote = await sdk.exchange.getTokenToNativePrice({
  amount: '100',
  tokenIn: '0xTokenAddress',
  chainId: 1
});

// Execute swap: ERC-20 → native
await sdk.exchange.swapTokenToNative({ amount: '100', tokenIn: '0x...', chainId: 1 });


// ── Solana ───────────────────────────────────────

// Get a quote: SOL → SPL token
const solToTokenQuote = await sdk.exchange.getSolanaToTokenQuote({
  outputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  amount: 1,
  slippageBps: 50
});

// Get a quote: SPL token → SOL
const tokenToSolQuote = await sdk.exchange.getTokenToSolanaQuote({
  amount: '100',
  inputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
});

// Get a quote: SPL token → SPL token
const splToSplQuote = await sdk.exchange.getTokenToTokenQuote({
  inputMint: '0xInputMint',
  outputMint: '0xOutputMint',
  amount: 50
});

// Execute swap: SOL → SPL token
const solSwap = await sdk.exchange.swapSolToToken({
  outputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  amount: 1,
  slippageBps: 50
});
console.log(solSwap.data.signature);

// Execute swap: SPL token → SOL
await sdk.exchange.swapTokenToSol({ amount: '100', inputMint: 'MintAddress' });

// Execute swap: SPL token → SPL token
await sdk.exchange.swapTokenToTokenSolana({ inputMint: '0x...', outputMint: '0x...', amount: 50 });
```

---

### Bills – Discovery Service

Use this service to look up available billers and products before making a payment.

```typescript
// Get biller items by category and biller name
// Categories: 'AIRTIME' | 'MOBILEDATA' | 'CABLEBILLS' | 'UTILITYBILLS'
const mtnData = await sdk.billsDiscovery.getBiller('MOBILEDATA', 'MTN');
// Returns available data bundles with item codes, amounts, validity periods

// Get all electricity distribution companies
const discos = await sdk.billsDiscovery.getElectricityBiller();
// Returns: ElectricityBillerResponseDto — array of { name, code, billerCode }
```

---

### Bills – Pay Service

```typescript
// Buy airtime
const airtime = await sdk.billsPay.buyAirtime({
  phoneNumber: '08012345678',
  biller: 'MTN',
  amount: 500
});
console.log(`Reference: ${airtime.data.reference}`);

// Buy mobile data (requires itemCode from discovery)
const data = await sdk.billsPay.buyMobileData({
  phoneNumber: '08012345678',
  biller: 'MTN',
  itemCode: 'MD0101' // from billsDiscovery.getBiller()
});

// Pay electricity bill
const electricity = await sdk.billsPay.buyElectricity({
  meterNumber: '04123456789',
  amount: 5000,
  disco: 'IKEJA ELECTRIC'
});
console.log(`Token: ${electricity.data.token}`);

// Subscribe to cable TV (DSTV, GOTV, Startimes)
const cable = await sdk.billsPay.subscribeCableTv({
  smartcardNumber: '7012345678',
  biller: 'DSTV',
  itemCode: 'DSTV_COMPACT'
});
```

All bill pay methods also support scheduling and beneficiary saving:

```typescript
await sdk.billsPay.buyAirtime({
  phoneNumber: '08012345678',
  biller: 'MTN',
  amount: 500,
  saveBeneficiary: true,
  beneficiaryName: 'My MTN',
  isSchedule: true,
  scheduleData: {
    executionDate: '2025-08-01T08:00:00Z',
    isRecurring: true,
    recurrencePattern: 'MONTHLY'
  }
});
```

---

### Bills – Validation Service

Validate a customer/meter number before making a payment.

```typescript
const validation = await sdk.billsValidation.validate({
  billerCode: 'IKEJA_ELECTRIC_PREPAID',
  customer: '04123456789',
  itemCode: 'PREPAID' // optional
});
```

---

### Bills – Records Service

```typescript
// Get paginated bill payment history
const history = await sdk.billsRecords.getBills();
// Returns: PaginatedBillResponseDto

// Look up a specific bill payment by reference
const bill = await sdk.billsRecords.getBillByReference('ref-001');

// Generate a payment receipt
const receipt = await sdk.billsRecords.generateReceipt('txn-id');
```

---

### Offramp – Exchange Service

Convert crypto to fiat (NGN) and send directly to a Nigerian bank account.

```typescript
import { OfframpAssets, OfframpNetworks, OfframpCurrency } from 'monei-sdk';

// Get all supported offramp assets
const assets = await sdk.offrampExchange.getAssets();

// Get a conversion quote
const quote = await sdk.offrampExchange.getQuote({
  token: OfframpAssets.USDT,
  network: OfframpNetworks.base,
  amount: 100,
  fiat: OfframpCurrency.NGN
});
console.log(`Rate: ${quote.data}`);

// Initiate a crypto-to-fiat swap (sends NGN to the provided bank account)
const swap = await sdk.offrampExchange.initiateSwap({
  amount: 100,
  token: OfframpAssets.USDT,
  network: OfframpNetworks.base,
  fiatCurrency: OfframpCurrency.NGN,
  bankCode: '058',
  accountNumber: '1234567890',
  accountName: 'John Doe'
});
console.log(`Order ID: ${swap.data.id}`);
console.log(`Deposit Address: ${swap.data.onChain.depositAddress}`);
```

**Supported assets:** `USDT`, `USDC`, `CNGN`

**Supported networks:** `base`, `polygon`, `arbitrum-one`, `bnb-smart-chain`, `ethereum`, `starknet`, `optimism`, `lisk`, `scroll`

---

### Offramp – Payout Service

```typescript
// Get list of Nigerian banks supported for offramp payouts
const banks = await sdk.offrampPayouts.getBanks();

// Verify a bank account before initiating a swap
const verified = await sdk.offrampPayouts.verifyBankAccount({
  bankCode: '058',
  accountNumber: '1234567890'
});
console.log(verified.data.accountName);
```

---

### Offramp – Ledger Service

```typescript
// Get offramp transaction history (paginated)
const history = await sdk.offrampLedger.getTransactions({
  limit: '20',
  page: '1'
});

// Track a specific offramp order by reference
const order = await sdk.offrampLedger.trackOrder({ reference: 'order-ref-001' });
console.log(`Status: ${order.data.status}`);
```

**Offramp order statuses:** `initiated` → `quote_created` → `awaiting_deposit` → `deposit_received` → `processing` → `fiat_sent` → `completed`

---

### Business Service

Manage customers under a business account.

```typescript
// Create a new customer
const customer = await sdk.business.createBusinessCustomer('business-id', {
  name: 'Jane Doe',
  phone: '08098765432',
  email: 'jane@company.com',
  externalRef: 'your-internal-id'
});

// Get all customers for a business
const customers = await sdk.business.getBusinessCustomers('business-id');

// Get a specific customer's details
const details = await sdk.business.getCustomerDetails('business-id', 'customer-id');

// Update a customer
await sdk.business.updateCustomer('business-id', 'customer-id', {
  name: 'Jane Smith',
  phone: '08098765432',
  email: 'jane.smith@company.com',
  externalRef: 'your-internal-id'
});

// Disable a customer
await sdk.business.disableCustomer('business-id', 'customer-id');
```

---

### Agent Service

```typescript
// List all conversations
const conversations = await sdk.agent.getConversations();

// Initialize a new conversation
await sdk.agent.initializeConversation({ id: 'conv_001' });

// Chat with the AI agent
const response = await sdk.agent.chat({
  message: "What's my wallet balance?",
  conversationId: 'conv_001'
});
console.log(response.response);

// Stream a response (for real-time UX)
const stream = await sdk.agent.streamChat({
  message: "Explain my recent transactions",
  conversationId: 'conv_001',
  chainId: 1 // optional
});

// Guest agent — no conversation ID needed
const guestReply = await sdk.agent.streamGuestChat({
  message: "How do I create a wallet?",
  chatHistory: [
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi! How can I help?' }
  ]
});

// Get messages in a conversation
const messages = await sdk.agent.getConversationMessages('conv_001', 20);

// Pin or unpin a conversation
await sdk.agent.pinConversation('conv_001', { pin: true });

// Delete a conversation
await sdk.agent.deleteConversation('conv_001');
```

---

## Error Handling

```typescript
import { MoneiError, AuthenticationError, ValidationError, NotFoundError, RateLimitError } from 'monei-sdk';

try {
  const user = await sdk.user.getCurrentUser();
} catch (error) {
  if (error instanceof AuthenticationError) {
    // 401 — Invalid or expired API key / bearer token
    console.error('Authentication failed');
  } else if (error instanceof ValidationError) {
    // 400 — Invalid request parameters
    console.error('Validation error:', error.message);
  } else if (error instanceof NotFoundError) {
    // 404 — Resource not found
    console.error('Not found');
  } else if (error instanceof RateLimitError) {
    // 429 — Too many requests
    console.error('Rate limit exceeded, retry after a moment');
  } else if (error instanceof MoneiError) {
    // Any other API error
    console.error(`API error ${error.statusCode}: ${error.message}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## TypeScript Support

All services, request DTOs, and response DTOs are fully typed. Import any type you need:

```typescript
import type {
  // User
  UserDto, UserResponseDto, UpdateUserDto,

  // Wallet
  UserWalletResponseDto, SubWalletDto, VirtualAccountResponseDto,

  // Deposit
  GeneratePaymentLinkDto, PaymentResponseDto, DepositDto,

  // Payout
  BankTransferRequestDto, BankTransferResponseDto, PeerTransferDto,

  // EVM
  UserEvmPortfolioDto, SendNativeTokenDto, SendTokenDto, SupportedNetworkDto,

  // Solana
  PortfolioDto, TransferSolDto, TransferTokenDto,

  // Exchange
  SwapNativeToTokenDto, SwapSolToTokenDto, SwapResponseDto,

  // Bills
  BillerDto, AirtimePurchaseDto, DataPurchaseDto, ElectricityPaymentDto, CableTvPaymentDto,

  // Offramp
  OfframpOrderResponseDto, SwapCryptoToFiatRequestDto, OfframpQuoteRequestDto,

  // Business
  CreateCustomerDto, UpdateCustomerDto,

  // Enums
  TransactionType, TransactionStatus, TransactionNature,
  OfframpStatus, OfframpAssets, OfframpNetworks, OfframpCurrency,
  DEPOSIT_METHOD, PaymentMethodType
} from 'monei-sdk';
```

---

## Chain IDs & Networks

### EVM Chain IDs

| Chain | Chain ID |
|---|---|
| Ethereum | 1 |
| BNB Smart Chain | 56 |
| Polygon | 137 |
| Arbitrum One | 42161 |
| Optimism | 10 |
| Base | 8453 |

### Solana Networks

| Value | Description |
|---|---|
| `mainnet-beta` | Solana mainnet |
| `devnet` | Solana devnet |
| `testnet` | Solana testnet |

### Offramp Networks

`base` · `polygon` · `arbitrum-one` · `bnb-smart-chain` · `ethereum` · `starknet` · `optimism` · `lisk` · `scroll`

---

## Getting Help

- **API Docs**: [goviral-ai-lab.gitbook.io/monei-api-gateway-docs](https://goviral-ai-lab.gitbook.io/monei-api-gateway-docs/)
- **Interactive Reference**: [api.monei.cc/api-gateway-docs](https://api.monei.cc/api-gateway-docs)
- **Support**: tech@monei.cc
- **Issues**: [GitHub Issues](https://github.com/monei/monei-nodejs-sdk/issues)

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

> **Note**: This SDK is intended for **server-side use only**. Never expose your API keys in browser or client-side code.