import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MoneiConfig } from '../types';
import { MoneiError, AuthenticationError, ValidationError, NotFoundError, RateLimitError } from '../errors/MoneiError';

export class MoneiClient {
  private client: AxiosInstance;
  private config: MoneiConfig;

  constructor(config: MoneiConfig) {
    this.config = {
      baseUrl: 'https://api.monei.cc',
      timeout: 30000,
      ...config
    };

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'X-API-KEY': this.config.apiKey || process.env.MONEI_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 400:
              throw new ValidationError(data?.message || 'Bad request');
            case 401:
              throw new AuthenticationError(data?.message || 'Unauthorized');
            case 404:
              throw new NotFoundError(data?.message || 'Not found');
            case 429:
              throw new RateLimitError(data?.message || 'Rate limit exceeded');
            default:
              throw new MoneiError(
                data?.message || 'Internal server error',
                status
              );
          }
        } else if (error.request) {
          throw new MoneiError('Network error: Unable to connect to API');
        } else {
          throw new MoneiError('Request configuration error');
        }
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  public setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
    this.client.defaults.headers['X-API-KEY'] = apiKey;
  }

  public setBearerToken(token: string): void {
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  public removeBearerToken(): void {
    delete this.client.defaults.headers['Authorization'];
  }
}