export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum CONTENT_TYPES {
  JSON = "application/json",
  FORM_DATA = "multipart/form-data"
}

export interface HTTPClientOptions {
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
}

export type HTTPClientForRequest = Omit<HTTPClientOptions, "timeout"> & {
  method: HTTP_METHODS;
};

export interface HTTPClient<T> {
  get: (url: string, options?: HTTPClientOptions) => Promise<T | Error>;
  put: (url: string, options: HTTPClientOptions) => Promise<T | Error>;
  patch: (url: string, options: HTTPClientOptions) => Promise<T | Error>;
  post: (url: string, options: HTTPClientOptions) => Promise<T | Error>;
  delete: (url: string, options?: HTTPClientOptions) => Promise<T | Error>;
}
