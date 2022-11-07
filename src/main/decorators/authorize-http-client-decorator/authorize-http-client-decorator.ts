import { GetStorage } from '@/data/Protocols/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/Protocols/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClientSpy: HttpClient
  ) {}
  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    //se não existir um account no localStorage ele simplesmente vai pular o if e retornar get da reequisição
    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          //se o params.headers vier vazio ou undefined ele muda pra um objeto vazio {}
          'x-access-token': account.accessToken, //o 'x-access-token' é o nome de envio do token do back
        }),
      });
    }
    const httpResponse = await this.httpClientSpy.request(data);
    return httpResponse;
  }
}
