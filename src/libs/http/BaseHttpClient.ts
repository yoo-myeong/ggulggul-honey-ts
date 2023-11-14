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
      validateStatus: () => true,
    });
  }

  get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.http.get<T>(url, config);
  };

  post = async <T>(params: {
    url: string;
    body: Record<string, unknown>;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> => {
    const { url, body, config } = params;
    return this.http.post<T>(url, body, config);
  };

  patch = async <T>(params: {
    url: string;
    body: Record<string, unknown>;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> => {
    const { url, body, config } = params;
    return this.http.patch<T>(url, body, config);
  };

  put = async <T>(params: {
    url: string;
    body: Record<string, unknown>;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> => {
    const { url, body, config } = params;
    return this.http.put<T>(url, body, config);
  };

  delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.http.delete<T>(url, config);
  };
}
