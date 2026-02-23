export interface SwapNativeToTokenDto {
  amount: string;
  tokenOut: string;
  chainId: number;
}

export interface SwapTokenToTokenDto {
  inputMint: string;
  outputMint: string;
  amount: number;
  chainId?: number;
}

export interface EvmTokenToTokenDto {
  tokenIn: string;
  tokenOut: string;
  amount: string;
  chainId?: number;
}

export interface SwapTokenToNativeDto {
  amount: string;
  tokenIn: string;
  chainId: number;
}


export interface ZeroExQuoteDto {
  permit2?: any;
  transaction: any;
}

export interface PriceResponseDto {
  statusCode: number;
  message: string;
  data: ZeroExQuoteDto;
  errors?: {};
}

export interface TxHashDto {
  txHash: string;
}

export interface TxHashResponseDto {
  statusCode: number;
  message: string;
  data: TxHashDto;
}

export interface SwapSolToTokenDto {
  outputMint: string;
  amount: number;
  slippageBps?: number;
}

export interface SwapTokenToSolDto {
  amount: string;
  inputMint: string;
}

export interface SwapDto {
  signature: string;
  txUrl: string;
}

export interface SwapResponseDto {
  statusCode: number;
  message: string;
  data: SwapDto;
}