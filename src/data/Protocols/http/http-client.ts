export type HttpRequest = {
  url: string;
  method: HttpMethod;
  headers?: any;
  body?: any;
};

export interface HttpClient<ResponseType = any> {
  request(data: HttpRequest): Promise<HttpResponse<ResponseType>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  aunthorized = 401,
  forbiden = 403,
  notFound = 404,
  serverError = 500,
}
// o T é any pq se não for passado algum tipo ele vai ser qualquer um
export type HttpResponse<ResponseType = any> = {
  statusCode: HttpStatusCode;
  body?: ResponseType;
};
