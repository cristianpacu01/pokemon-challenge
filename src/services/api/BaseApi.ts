
import {
  HTTPHeaders,
  ApiConfiguration,
  RequestOptions,
  HTTPMethod,
  HTTPQuery,
} from 'src/types';

type FetchParams = {
  requestConfig: RequestConfig;
  url: string;
}

type RequestConfig = {
  body?: BodyInit,
  credentials?: RequestCredentials;
  headers?: HTTPHeaders,
  method: HTTPMethod
}

class BaseAPI {
  constructor(private apiConfiguration: ApiConfiguration = {}) {}

  protected request = async (options: RequestOptions): Promise<Response> => {
    const { url, requestConfig } = this.createFetchParams(options);
    const response = await this.fetchApi(url, requestConfig);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const errorResponse = await response.json();
    throw errorResponse;
  }

  private fetchApi = async (url: string, requestConfig: RequestConfig) =>
    await fetch(url, requestConfig)

  private toQueryString = (params: HTTPQuery, prefix: string = ''): string => {
    return Object.keys(params)
      .map((key) => {
        const fullKey = prefix + (prefix.length ? `[${key}]` : key);
        const value = params[key];
        if (value instanceof Array) {
          const multiValue = value
            .map((singleValue) => encodeURIComponent(String(singleValue)))
            .join(`&${encodeURIComponent(fullKey)}=`);
          return `${encodeURIComponent(fullKey)}=${multiValue}`;
        }
        if (value instanceof Object) {
          return this.toQueryString(value as HTTPQuery, fullKey);
        }
        return `${encodeURIComponent(fullKey)}=${encodeURIComponent(
          String(value)
        )}`;
      })
      .filter((part) => part.length > 0)
      .join('&');
  };

  private createFetchParams = (options: RequestOptions): FetchParams => {
    let url = (this.apiConfiguration.basePath || '') + options.path;
    if (options.query && Object.keys(options.query).length) {
      url += '?' + this.toQueryString(options.query);
    }

    const body = JSON.stringify(options.body);
    const headers = Object.assign({},
      this.apiConfiguration.headers,
      options.headers
    );
    const requestConfig = {
      body,
      credentials: this.apiConfiguration.credentials,
      headers,
      method: options.method,
    };

    return { requestConfig, url };
  };
}

export default BaseAPI;
