export type HTTPHeaders = { [key: string]: string };

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';

export type HTTPQuery = {
  [key: string]:
    | string
    | number
    | null
    | boolean
    | Array<string | number | null | boolean>
    | HTTPQuery;
};

export type Json = any;

export type HTTPBody = Json | FormData | URLSearchParams;

export interface RequestOptions {
  body?: HTTPBody;
  headers?: HTTPHeaders;
  method: HTTPMethod;
  path: string;
  query?: HTTPQuery;
}

export type ApiConfiguration = {
  basePath?: string;
  credentials?: RequestCredentials;
  headers?: HTTPHeaders;
};
