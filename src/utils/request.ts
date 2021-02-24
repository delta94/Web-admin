import apisauce from 'apisauce';
import { LocalStorageService } from 'services/localStorage.service';
export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

/**
 * Create Http Instance
 * @param  {string} APIEndpoint      The URL we want to request
 *
 * @return {HttpRequest}             The HttpRequest
 */
export class HttpRequest {
  request: any;
  localService: any;
  constructor(APIEndpoint) {
    this.localService = new LocalStorageService();
    this.request = apisauce.create({
      baseURL: APIEndpoint,
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '***',
        Accept: '*/*',
      },
      timeout: 25000,
    });
    const token = this.localService.getItem('_token');
    if (token) {
      const subStringToken = token.substring(
        1,
        Object.entries(token).length - 1,
      );
      this.request.setHeaders({
        Authorization: subStringToken,
      });
    }
  }
}
