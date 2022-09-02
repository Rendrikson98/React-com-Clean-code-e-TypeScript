import { HttpGetClient } from '@/data/Protocols/http';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll(): Promise<void> {
    await this.httpGetClient.get({ url: this.url });
  }
}
