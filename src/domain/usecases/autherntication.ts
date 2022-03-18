// eslint-disable-next-line no-unused-vars
import { AccountModel } from '../models/account-models'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
