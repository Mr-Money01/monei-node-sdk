import { Tier } from "./enums/kyc.enum";

export interface KycStatusDto {
  statusCode: number;
  message: string;
  data: [];
  errors?: {};
}



export interface KycStatusData {
  currentTier: Tier;
  status: string;
  limits: TierLimitsData;
  requirements: string;
  verified: VerificationStatusData;
  canUpgrade: boolean;
  nextTier: Tier;

}

export interface KycStatusResponseDto {
  statusCode: number;
  message: string;
  data: KycStatusData
  errors: {};

}

export interface VerificationStatusData {
  nin: boolean;
  bvn: boolean;
  governmentId: boolean;
  selfie: boolean;
  biometric: boolean;
  address: boolean;
}

export interface TierLimitsData {
  maxSingleTranscation: number;
  dailyTransactionLimits: number;
  monthlyTransactionLimits: number; 
  maxWalletBalance: number;
  cryptoAllowed: boolean;
  crossBorderAllowed: boolean;
  cryptoDailyLimits: number
  p2pAllowed: boolean;
  withdrawalAllowed: boolean;

}










