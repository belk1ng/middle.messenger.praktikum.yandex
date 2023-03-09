const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

class HTTPTransport {
  queryStringify = (data) =>
    "?" +
    Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  get = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  patch = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PATCH }, options.timeout);

  post = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url, options, timeout = 5000) => {
    const { data, method, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      console.log(method, data);

      const isGetRequest = method === METHODS.GET;

      const _url =
        isGetRequest && data ? `${url}${this.queryStringify(data)}` : url;

      console.log(url);

      xhr.open(method, _url);
      xhr.timeout = timeout;

      // Resolve data
      xhr.onload = () => {
        resolve(xhr);
      };

      // Reject request
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
        xhr.send(data);
      }
    });
  };
}

const httpClient = new HTTPTransport();

export default httpClient;
