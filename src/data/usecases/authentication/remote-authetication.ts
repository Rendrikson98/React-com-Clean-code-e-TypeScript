import { HttpStatusCode } from '@/data/Protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { UnexpectedError } from '@/domain/erros/unexpected-credentials-error'
import { AccountModel } from '@/domain/models/account-models'
import { HttpPostClient } from '../../../data/Protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/autherntication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.aunthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
