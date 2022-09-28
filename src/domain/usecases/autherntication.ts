// eslint-disable-next-line no-unused-vars
import { AccountModel } from '../models/account-models';

export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Model>;
}
//o nome dessa padrão é TypeAlias onde criamos um namspace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace
export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Model = AccountModel;
}
