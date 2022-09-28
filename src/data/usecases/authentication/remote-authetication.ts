import { HttpPostClient, HttpStatusCode } from '@/data/Protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/erros';
import { Authentication } from '../../../domain/usecases';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.aunthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
//o nome dessa padrão é TypeAlias onde criamos um namespace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace.
//Nesse caso estamos criando um namespace para a classe, já que já fizemos a da interface na camada de domain
export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
