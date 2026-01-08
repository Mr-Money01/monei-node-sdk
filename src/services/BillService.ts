import { MoneiClient } from '../client/MoneiClient';
import {
  BillCategory,
  BillerItemsResponseDto,
  ValidateBillDto,
  AirtimePurchaseDto,
  DataPurchaseDto,
  ElectricityPaymentDto,
  CableTvPaymentDto,
  BillPaymentResponseDto,
  ElectricityBillerDto,
  BillDto,
  ElectricityBillerResponseDto,
  PaginatedBillResponseDto,
  BillResponseDto
} from '../types';

export class BillService {
  constructor(private client: MoneiClient) {}

  async getBillerItems(category: BillCategory, billerName: string): Promise<BillerItemsResponseDto> {
    return this.client.get<BillerItemsResponseDto>(`/api/v1/bills/get-biller-items/${category}/${billerName}`);
  }

  async getElectricityBiller(): Promise<ElectricityBillerResponseDto> {
    return this.client.get<ElectricityBillerResponseDto>('/api/v1/bills/billers/electricity');
  }

  async validateBill(validateData: ValidateBillDto): Promise<any> {
    return this.client.post('/api/v1/bills/validate', validateData);
  }

  async buyAirtime(airtimeData: AirtimePurchaseDto): Promise<BillPaymentResponseDto> {
    return this.client.post<BillPaymentResponseDto>('/api/v1/bills/buy-airtime', airtimeData);
  }

  async buyMobileData(dataData: DataPurchaseDto): Promise<BillPaymentResponseDto> {
    return this.client.post<BillPaymentResponseDto>('/api/v1/bills/buy-mobile-data', dataData);
  }

  async buyElectricity(electricityData: ElectricityPaymentDto): Promise<BillPaymentResponseDto> {
    return this.client.post<BillPaymentResponseDto>('/api/v1/bills/buy-electricity', electricityData);
  }

  async subscribeCableTv(cableData: CableTvPaymentDto): Promise<BillPaymentResponseDto> {
    return this.client.post<BillPaymentResponseDto>('/api/v1/bills/subscribe-cable-tv', cableData);
  }

  async getBills(): Promise<PaginatedBillResponseDto[]> {
    return this.client.get<PaginatedBillResponseDto[]>('/api/v1/bills');
  }

  async getBillByReference(reference: string): Promise<BillResponseDto[]> {
    return this.client.get<BillResponseDto[]>(`/api/v1/bills/reference/${reference}`);
  }

  async generateReceipt(transactionId: string): Promise<any> {
    return this.client.get<any>(`/api/v1/bills/receipt/${transactionId}`);
  }
}