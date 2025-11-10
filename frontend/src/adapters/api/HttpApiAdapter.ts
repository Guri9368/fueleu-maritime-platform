import axios, { AxiosInstance } from 'axios';
import { ApiPort } from '../../core/ports/output/ApiPort';
import { Route } from '../../core/domain/models/Route';
import { ComplianceBalance, AdjustedCB } from '../../core/domain/models/Compliance';
import { BankEntry } from '../../core/domain/models/Banking';
import { PoolResult, PoolMemberInput } from '../../core/domain/models/Pool';
import { RouteComparison } from '../../core/domain/types';

export class HttpApiAdapter implements ApiPort {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getRoutes(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]> {
    const response = await this.client.get('/routes', { params: filters });
    return response.data;
  }

  async setBaseline(routeId: string): Promise<Route> {
    const response = await this.client.post(`/routes/${routeId}/baseline`);
    return response.data;
  }

  async compareRoutes(): Promise<RouteComparison> {
    const response = await this.client.get('/routes/comparison');
    return response.data;
  }

  async getComplianceBalance(
    shipId: string,
    year: number
  ): Promise<ComplianceBalance> {
    const response = await this.client.get('/compliance/cb', {
      params: { shipId, year },
    });
    return response.data;
  }

  async getAdjustedCB(shipId: string, year: number): Promise<AdjustedCB> {
    const response = await this.client.get('/compliance/adjusted-cb', {
      params: { shipId, year },
    });
    return response.data;
  }

  async getBankRecords(shipId: string, year?: number): Promise<BankEntry[]> {
    const response = await this.client.get('/banking/records', {
      params: { shipId, year },
    });
    return response.data;
  }

  async bankSurplus(
    shipId: string,
    year: number,
    amount: number
  ): Promise<BankEntry> {
    const response = await this.client.post('/banking/bank', {
      shipId,
      year,
      amount,
    });
    return response.data;
  }

  async applyBanked(
    shipId: string,
    year: number,
    amount: number
  ): Promise<BankEntry> {
    const response = await this.client.post('/banking/apply', {
      shipId,
      year,
      amount,
    });
    return response.data;
  }

  async createPool(
    year: number,
    members: PoolMemberInput[]
  ): Promise<PoolResult> {
    const response = await this.client.post('/pools', { year, members });
    return response.data;
  }
}
