import { HttpStatusCode } from '@/data/Protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { HttpPostClient } from '../../../data/Protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/autherntication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.aunthorized: throw new InvalidCredentialsError()
    }
  }
}
