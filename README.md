# Mr. Monei Node.js SDK

The official Node.js SDK for Monei API - providing seamless integration with Monei's comprehensive financial services including wallets, crypto transactions, bill payments, and AI agent.

## Installation

```bash
npm install monei-sdk
```

## Quick Start

```typescript
import MoneiSDK from 'monei-sdk';

async function main() {
  // Initialize SDK with API key
  const sdk = new MoneiSDK({
    apiKey: process.env.MONEI_API_KEY!
  });

  try {
    // Get user info
    const user = await sdk.user.getCurrentUser();
    console.log(`Welcome ${user.data.firstName} ${user.data.lastName}!`);

    // Get wallet balance
    const wallet = await sdk.wallet.getWalletBalance();
    console.log(`Naira Balance: ₦${wallet.nairaBalance.toLocaleString()}`);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Features

- **User Management** - Profile, KYC verification, user updates
- **Wallet Operations** - Balance, funding, withdrawals, peer transfers, bank verification
- **EVM Wallets** - Ethereum, BSC, Polygon, Arbitrum support
- **Solana Wallets** - SOL and SPL token management
- **Bill Payments** - Airtime, data, electricity, cable TV
- **Crypto Exchange** - Token swaps on EVM and Solana
- **AI Agent** - Financial assistant with streaming support
- **Transaction Management** - Transaction history and tracking
- **Beneficiary Management** - Bank, crypto, and peer beneficiaries
- **Full TypeScript Support** - Complete type definitions

## Basic Usage Examples

### 1. Wallet Operations

```typescript
import MoneiSDK from 'monei-sdk';

const sdk = new MoneiSDK({ apiKey: 'your-api-key' });

// Fund wallet
const fundResult = await sdk.wallet.fundWalletByNaira({
  amount: 5000
});
console.log(`Funding link: ${fundResult.data.link}`);

// Peer transfer
await sdk.wallet.peerTransfer({
  receiver: "user@example.com",
  amount: 1000,
  transactionPin: "123456"
});

// Get banks and verify account
const banks = await sdk.wallet.getBanks();
const account = await sdk.wallet.verifyBankAccount({
  accountNumber: "1234567890",
  bank: "058" // GTBank code
});
console.log(`Account Name: ${account.data.accountName}`);
```

### 2. Crypto Operations - EVM

```typescript
// Get EVM portfolio
const portfolio = await sdk.evm.getPortfolio(56); // BSC
console.log(`Portfolio value: $${portfolio.data.totalPortfolioValueUSD}`);

// Get token balance
const balance = await sdk.evm.getTokenBalance(
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  1 // Ethereum
);

// Send native token
const transferResult = await sdk.evm.sendNativeToken({
  to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  amount: "0.01",
  chainId: 1 // Ethereum
});
console.log(`Transaction hash: ${transferResult.data.txHash}`);
```

### 3. Crypto Operations - Solana

```typescript
// Get Solana wallet address
const address = await sdk.solana.getWalletAddress();
console.log(`Wallet address: ${address.data.address}`);

// Get portfolio
const portfolio = await sdk.solana.getPortfolio('mainnet-beta');
console.log(`SOL Balance: ${portfolio.data.nativeBalance}`);

// Transfer SOL
const transferResult = await sdk.solana.sendNativeToken({
  to: "5AH3qo1v1EZfT3QKQpSsx1F8W5JyGEVZPcD5DzkX1N1d",
  amount: "1.5",
  network: "mainnet-beta"
});
console.log(`Signature: ${transferResult.data.signature}`);
```

### 4. Bill Payments

```typescript
// Buy airtime
const airtimeResult = await sdk.bills.buyAirtime({
  phoneNumber: "08012345678",
  biller: "MTN",
  amount: 500
});
console.log(`Airtime purchase successful! Reference: ${airtimeResult.data.reference}`);

// Buy electricity
const electricityResult = await sdk.bills.buyElectricity({
  meterNumber: "04123456789",
  amount: 2000,
  disco: "IKEJA DISCO ELECTRICITY"
});

// Get bill history
const history = await sdk.bills.getBillHistory();
```

### 5. AI Agent

```typescript
// Get conversations
const conversations = await sdk.agent.getConversations();

// Initialize conversation
await sdk.agent.initializeConversation({
  id: "conv_123"
});

// Chat with AI agent
const chatResponse = await sdk.agent.chat({
  message: "What's my current account balance?",
  conversationId: "conv_123"
});
console.log(`Agent: ${chatResponse.response}`);

// Get conversation messages
const messages = await sdk.agent.getConversationMessages("conv_123", 20);
```

### 6. Crypto Exchange

```typescript
// Get swap quote
const quote = await sdk.exchange.getNativeToTokenQuote({
  amount: "0.1",
  tokenOut: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  chainId: 1
});

// Execute swap
const swapResult = await sdk.exchange.swapNativeToToken({
  amount: "0.1",
  tokenOut: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  chainId: 1
});
console.log(`Swap transaction: ${swapResult.data.txHash}`);
```

### 7. Transaction Management

```typescript
// Get user transactions
const transactions = await sdk.transactions.getUserTransactions();
console.log(`Found ${transactions.data.length} transactions`);

// Get specific transaction
const transaction = await sdk.transactions.getTransactionById("txn_123");
console.log(`Amount: ${transaction.amount} ${transaction.currency}`);

// Get transaction by reference
const txByRef = await sdk.transactions.getTransactionByReference("ref_456");
```

## Advanced Usage

### Error Handling

```typescript
import { MoneiError, AuthenticationError, ValidationError } from 'monei-sdk';

try {
  await sdk.user.getCurrentUser();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log('Authentication failed - check your API key or bearer token');
  } else if (error instanceof ValidationError) {
    console.log('Invalid request parameters');
  } else if (error instanceof MoneiError) {
    console.log(`API Error: ${error.message} (Status: ${error.statusCode})`);
  } else {
    console.log('Unexpected error:', error);
  }
}
```

### Using with Async/Await

```typescript
async function comprehensiveExample() {
  const sdk = new MoneiSDK({ 
    apiKey: process.env.MONEI_API_KEY!,
    baseUrl: 'https://api.monei.cc', // Optional
    timeout: 30000 // Optional, default 30s
  });

  try {
    // Multiple operations
    const [user, wallet, transactions] = await Promise.all([
      sdk.user.getCurrentUser(),
      sdk.wallet.getWalletBalance(),
      sdk.transactions.getUserTransactions()
    ]);

    console.log(`User: ${user.data.name}`);
    console.log(`Balance: ₦${wallet.nairaBalance}`);
    console.log(`Transaction count: ${transactions.data.length}`);

  } catch(error) {
    console.error('Error:', error);

  }
}
```

### Environment Configuration

```typescript
// config/monei.ts
import MoneiSDK from 'monei-sdk';

export const moneiSDK = new MoneiSDK({
  apiKey: process.env.MONEI_API_KEY!,
  baseUrl: process.env.MONEI_BASE_URL || 'https://api.monei.cc',
  timeout: parseInt(process.env.MONEI_TIMEOUT || '30000')
});

```

## API Reference

### SDK Configuration

```typescript
interface MoneiConfig {
  apiKey: string;           // Required: Your Monei API key
  baseUrl?: string;         // Optional: API base URL (default: https://api.monei.cc)
  timeout?: number;         // Optional: Request timeout in ms (default: 30000)
}
```

### Available Services

- `sdk.user` - User profile and management
- `sdk.wallet` - Wallet operations and banking
- `sdk.evm` - EVM blockchain operations
- `sdk.solana` - Solana blockchain operations
- `sdk.transactions` - Transaction history
- `sdk.agent` - AI agent conversations
- `sdk.bills` - Bill payments
- `sdk.exchange` - Crypto token swaps

## Authentication

Get your API key from the [Mr. Monei Dashboard](https://monei.cc).

```typescript
// Recommended: Use environment variables
const sdk = new MoneiSDK({
  apiKey: process.env.MONEI_API_KEY!
});

```

## Error Types

The SDK provides specific error types for better error handling:

- `MoneiError` - Base error class
- `AuthenticationError` - Authentication failures (401)
- `ValidationError` - Invalid request parameters (400)
- `NotFoundError` - Resource not found (404)
- `RateLimitError` - Rate limit exceeded (429)

## Common Chain IDs

| Chain | Chain ID | Network Name |
|-------|----------|--------------|
| Ethereum | 1 | Mainnet |
| BSC | 56 | Mainnet |
| Polygon | 137 | Mainnet |
| Arbitrum | 42161 | Mainnet |
| Optimism | 10 | Mainnet |
| Base | 8453 | Mainnet |

## Solana Networks

- `mainnet-beta` - Solana mainnet
- `devnet` - Solana development network
- `testnet` - Solana test network

## Getting Help

- **Documentation**: [Mr. Monei API Gateway Docs](https://goviral-ai-lab.gitbook.io/monei-api-gateway-docs/)
- **API Reference**: [Interactive API Docs](https://api.monei.cc/api-gateway-docs)
- **Support**: tech@monei.cc
- **GitHub Issues**: [Report bugs or request features](https://github.com/monei/monei-nodejs-sdk/issues)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

---

**Note**: This SDK is designed for server-side use only. Never expose your API keys in client-side code.