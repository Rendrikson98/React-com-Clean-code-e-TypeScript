import { HttpPostClient } from '../../../data/Protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/autherntication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
