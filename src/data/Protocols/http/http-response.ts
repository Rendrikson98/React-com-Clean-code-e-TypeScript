export enum HttpStatusCode {
  noContent = 204,
  aunthorized = 401
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
