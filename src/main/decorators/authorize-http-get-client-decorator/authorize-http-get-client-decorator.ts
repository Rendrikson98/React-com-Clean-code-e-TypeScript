import { GetStorage } from '@/data/Protocols/cache';
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from '@/data/Protocols/http';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClientSpy: HttpGetClient
  ) {}
  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account');
    await this.httpGetClientSpy.get(params);
    return null;
  }
}
