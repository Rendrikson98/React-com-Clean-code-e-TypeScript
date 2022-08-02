// eslint-disable-next-line no-unused-vars
import { AccountModel } from '../models/account-models';

export type AddAccountParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export interface AddAccount {
  add(params: AddAccountParams): Promise<AccountModel>;
}
