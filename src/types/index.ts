export interface MoneiConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export * from "./user";
export * from "./wallet";
export * from "./agent";
export * from "./bills";
export * from "./evm";
export * from "./exchange";
export * from "./transaction";
export * from "./solana";