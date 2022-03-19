import { HttpPostClient, HttpStatusCode } from '@/data/Protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/erros'
import { AccountModel } from '@/domain/models/account-models'
import { Authentication, AuthenticationParams } from '../../../domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
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
