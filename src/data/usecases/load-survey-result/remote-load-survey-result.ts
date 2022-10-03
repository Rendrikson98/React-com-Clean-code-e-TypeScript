import { HttpGetClient, HttpStatusCode } from '@/data/Protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/erros';
import { LoadSuveyResult } from '@/domain/usecases/load-suvery-result';

export class RemoteLoadSurveyResult implements LoadSuveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSuveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
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
export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: Date;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
  };
}
