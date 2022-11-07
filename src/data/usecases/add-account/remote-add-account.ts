import { HttpClient, HttpStatusCode } from '@/data/Protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/erros';
import { AddAccount } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddAccount.Model>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.forbiden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
//o nome dessa padrão é TypeAlias onde criamos um namespace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace.
//Nesse caso estamos criando um namespace para a classe, já que já fizemos a da interface na camada de domain
export namespace RemoteAddAccount {
  export type Model = AddAccount.Model;
}
