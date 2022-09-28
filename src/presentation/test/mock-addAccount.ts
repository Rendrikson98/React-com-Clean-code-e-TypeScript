import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/teste';
import { AddAccount } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccount.Params;
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
