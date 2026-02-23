import { MoneiClient } from '../../client/MoneiClient';
import {
  BillCategory,
  BillerItemsResponseDto,
  ElectricityBillerResponseDto,
 
} from '../../types';

export class BillDiscoveryService {
  constructor(private client: MoneiClient) {}

  async getBillerItems(category: BillCategory, billerName: string): Promise<BillerItemsResponseDto> {
    return this.client.get<BillerItemsResponseDto>(`/api/v1/bills/discovery/biller-items/${category}/${billerName}`);
  }

  async getElectricityBiller(): Promise<ElectricityBillerResponseDto> {
    return this.client.get<ElectricityBillerResponseDto>('/api/v1/bills/discovery/electricity');
  }

 
}