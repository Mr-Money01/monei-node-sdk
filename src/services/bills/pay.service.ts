import { MoneiClient } from '../../client/MoneiClient';
import {
  AirtimePurchaseDto,
  DataPurchaseDto,
  ElectricityPaymentDto,
  CableTvPaymentDto,
  BillPaymentResponseDto
} from '../../types';

export class BillPayService {
  constructor(private client: MoneiClient) {}


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

 
}