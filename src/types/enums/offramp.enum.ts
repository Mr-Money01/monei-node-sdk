// enums/offramp.ts
export enum OfframpStatus {
    initiated = "initiated",
    quote_created = "quote_created",
    awaiting_deposit = "awaiting_deposit",
    deposit_received = "deposit_received",
    pending = "pending",
    processing = "processing",
    fiat_sent = "fiat_sent",
    completed = "completed",
    failed = "failed",
    cancelled = "cancelled",
    refunded = "refunded",
    expired = "expired"
}

export enum WalletType {
    MONEI_WALLET = "MONEI_WALLET",
    EXTERNAL_WALLET = "EXTERNAL_WALLET"
}

export enum OfframpCurrency {
    NGN = "NGN",
    GHS = "GHS",
    KES = "KES",
    USD = "USD"
}

export enum Providers {
   monirates= "monirates",
    bitnob = "bitnob",
    paycrest = "paycrest"
}

export enum OfframpAssets {
    USDT = "USDT",
    USDC = "USDC",
    CNGN = "CNGN"

}

export enum OfframpNetworks {
    base = "base",
    polygon = "polygon",
    arbitrum_one = "arbitrum-one",
    bnb_smart_chain= "bnb-smart-chain",
    ethereum = "ethereum",
    starknet = "starknet",
    optimism= "optimism",
    lisk = "lisk",
    scroll = "scroll"
}


   


    