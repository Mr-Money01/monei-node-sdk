export type BillCategory = 'AIRTIME' | 'MOBILEDATA' | 'CABLEBILLS' | 'UTILITYBILLS';

export interface BillerDto {
  id: number;
  biller_code: string;
  name: string;
  default_commission: number;
  date_added: string;
  country: string;
  is_airtime: boolean;
  biller_name: string;
  item_code: string;
  short_name: string;
  fee: number;
  commission_on_fee: boolean;
  reg_expression: string;
  label_name: string;
  amount: number;
  is_resolvable: boolean;
  group_name: string;
  category_name: string;
  is_data?: boolean;
  default_commission_on_amount: number;
  commission_on_fee_or_amount: number;
  validity_period?: string;
}

export interface BillerItemsResponseDto {
  statusCode: number;
  message: string;
  data: BillerDto[];
}



export interface ElectricityBillerDto {
  name: string;
  code: string;
  billerCode: string;
}

export interface ElectricityBillerResponseDto {
  statusCode: number,
  message: string,
  data: ElectricityBillerDto[]
}


export interface ValidateBillDto {
  itemCode?: string;
  billerCode: string;
  customer: string;
}

export interface CreateBillScheduleDto {
  executionDate: string;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

export interface AirtimePurchaseDto {
  isSchedule?: boolean;
  scheduleData?: CreateBillScheduleDto;
  saveBeneficiary?: boolean;
  beneficiaryName?: string;
  phoneNumber: string;
  biller: string;
  amount: number;
}

export interface DataPurchaseDto {
  isSchedule?: boolean;
  scheduleData?: CreateBillScheduleDto;
  saveBeneficiary?: boolean;
  beneficiaryName?: string;
  phoneNumber: string;
  biller: string;
  itemCode: string;
}

export interface ElectricityPaymentDto {
  isSchedule?: boolean;
  scheduleData?: CreateBillScheduleDto;
  saveBeneficiary?: boolean;
  beneficiaryName?: string;
  meterNumber: string;
  amount: number;
  disco: string;
}

export interface CableTvPaymentDto {
  isSchedule?: boolean;
  scheduleData?: CreateBillScheduleDto;
  saveBeneficiary?: boolean;
  beneficiaryName?: string;
  smartcardNumber: string;
  biller: string;
  itemCode: string;
}

export interface BillPaymentDto {
  id: string;
  createdAt: string;
  userId: string;
  reference: string;
  billerCode: string;
  itemCode: string;
  customer: string;
  amount: number;
  type: string;
  status: string;
  txRef: string;
  billerName: string;
  metadata?: string;
  token?: string;
  units?: string;
  validityPeriod?: string;
}

export interface BillPaymentResponseDto {
  statusCode: number;
  message: string;
  data: BillPaymentDto;
}

export interface BillDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string;
  userId: string;
  reference: string;
  billerCode: string;
  itemCode: string;
  customer: string;
  amount: number;
  type: BillCategory;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  txRef: string;
  billerName: string;
  validityPeriod?: string;
  metadata?: string;
  token?: string;
  units?: string;
}

export interface BillResponseDto {
  statusCode: 200,
  message: string;
  data: BillDto;
}

export interface PaginatedBillDto {
  bills: BillDto[];
  page: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedBillResponseDto {
  statusCode: number;
  message: string;
  data: PaginatedBillDto;
}

export interface BillDataDto {
  type: false;
  status: string;
  billerName: string;
  billerCode: string;
  customer: string;
  startDate: string;
  endDate: string;
  amount: number;
  reference: string;
  
}