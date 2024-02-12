import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable, unmanaged } from 'inversify';

@injectable()
export class BaseHttpClient {
  private readonly baseUrl: string;

  private readonly http: Axios;

  constructor(
    @unmanaged()
    props: {
      baseUrl: string;
      header?: Record<string, unknown>;
    },
  ) {
    this.http = axios.create({
      baseURL: props.baseUrl,
      headers: props.header || {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.http.request<T>(config);
    return response.data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'get',
      url,
    });
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'post',
      url,
      data,
    });
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'put',
      url,
      data,
    });
  }

  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'patch',
      url,
      data,
    });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'delete',
      url,
    });
  }
}
