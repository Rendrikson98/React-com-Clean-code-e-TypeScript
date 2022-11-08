import { RemoteSurveyResultModel } from '@/data/models';
import { HttpClient, HttpStatusCode } from '@/data/Protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/erros';
import { SaveSuveyResult } from '@/domain/usecases/save-suvery-result';

export class RemoteSaveSurveyResult implements SaveSuveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSuveyResult.Params): Promise<SaveSuveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params.answer,
    });
    const remoteSurveyResult = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteSurveyResult, {
          date: new Date(remoteSurveyResult.date),
        });
      case HttpStatusCode.forbiden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

//o nome dessa padrão é TypeAlias onde criamos um namespace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace.
//Nesse caso estamos criando um namespace para a classe, já que já fizemos a da interface na camada de domain
export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
