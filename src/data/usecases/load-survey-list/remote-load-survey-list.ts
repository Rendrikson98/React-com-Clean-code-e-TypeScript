import { HttpGetClient, HttpStatusCode } from '@/data/Protocols/http';
import { UnexpectedError } from '@/domain/erros';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSuveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteSurveys = httpResponse.body || []; //se httpResponse.body for vazio ou undefined troque por um array vazio []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((remoteSurvey) =>
          Object.assign(remoteSurvey, { date: new Date(remoteSurvey.date) })
        );
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
//o nome dessa padrão é TypeAlias onde criamos um namespace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace.
//Nesse caso estamos criando um namespace para a classe, já que já fizemos a da interface na camada de domain
export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  };
}
