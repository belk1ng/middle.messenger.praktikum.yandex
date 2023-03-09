import {
  HTTP_METHODS,
  HTTPClient,
  HTTPClientOptions,
  HTTPClientForRequest,
} from "./types";

class HTTPTransport<T> implements HTTPClient<T> {
  private queryStringify = (data: Record<string, unknown>) =>
    "?" +
    Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  public get = (url: string, options?: HTTPClientOptions): Promise<T | Error> =>
    this._request(
      url,
      { ...options, method: HTTP_METHODS.GET },
      options?.timeout
    );

  public put = (url: string, options: HTTPClientOptions): Promise<T | Error> =>
    this._request(
      url,
      { ...options, method: HTTP_METHODS.PUT },
      options.timeout
    );

  public patch = (
    url: string,
    options: HTTPClientOptions
  ): Promise<T | Error> =>
    this._request(
      url,
      { ...options, method: HTTP_METHODS.PATCH },
      options.timeout
    );

  public post = (url: string, options: HTTPClientOptions): Promise<T | Error> =>
    this._request(
      url,
      { ...options, method: HTTP_METHODS.POST },
      options.timeout
    );

  public delete = (
    url: string,
    options?: HTTPClientOptions
  ): Promise<T | Error> =>
    this._request(
      url,
      { ...options, method: HTTP_METHODS.DELETE },
      options?.timeout
    );

  private _request = (
    url: string,
    options: HTTPClientForRequest,
    timeout = 5000
  ): Promise<T | Error> => {
    const { data, method, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const isGetRequest = method === HTTP_METHODS.GET;

      const isContentTypeMultipartFormData =
        headers && headers["Content-Type"] === "multipart/form-data";

      const _url =
        isGetRequest && data
          ? `${url}${this.queryStringify(data as Record<string, unknown>)}`
          : url;

      xhr.open(method, _url);
      xhr.timeout = timeout;

      xhr.onload = () => {
        // Only resolve 1**, 2** and 3** response codes
        if (xhr.status < 400) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error("Error while request"));
        }
      };

      // Reject _request
      xhr.onabort = () => reject(new Error("Aborted"));
      xhr.onerror = () => reject(new Error("Request error"));
      xhr.ontimeout = () => reject(new Error("Timeout end"));

      // Set headers
      const headersEntries = Object.entries(headers);

      if (headersEntries.length > 0) {
        headersEntries.forEach(([header, value]) =>
          xhr.setRequestHeader(header, value)
        );
      }

      if (isGetRequest || !data) {
        xhr.send();
      } else {
        xhr.send(
          isContentTypeMultipartFormData
            ? (data as FormData)
            : JSON.stringify(data)
        );
      }
    });
  };
}

export default HTTPTransport;
