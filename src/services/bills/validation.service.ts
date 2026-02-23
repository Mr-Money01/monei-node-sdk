import { MoneiClient } from '../../client/MoneiClient';
import {
 
  ValidateBillDto,
  
} from '../../types';

export class BillValidateService {
  constructor(private client: MoneiClient) {}

  async validateBill(validateData: ValidateBillDto): Promise<any> {
    return this.client.post('/api/v1/bills/validation/customer', validateData);
  }

  
}
