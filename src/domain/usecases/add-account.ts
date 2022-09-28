// eslint-disable-next-line no-unused-vars
import { AccountModel } from '../models/account-models';

export interface AddAccount {
  add(params: AddAccount.Params): Promise<AddAccount.Model>;
}

//o nome dessa padrão é TypeAlias onde criamos um namspace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace
export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  export type Model = AccountModel;
}
