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
    const account = this.getStorage.get('account');
    //se não existir um account no localStorage ele simplesmente vai pular o if e retornar get da reequisição
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          //se o params.headers vier vazio ou undefined ele muda pra um objeto vazio {}
          'x-access-token': account.accessToken, //o 'x-access-token' é o nome de envio do token do back
        }),
      });
    }
    const httpResponse = await this.httpGetClientSpy.get(params);
    return httpResponse;
  }
}
