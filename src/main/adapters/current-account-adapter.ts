import { UnexpectedError } from '@/domain/erros';
import { AccountModel } from '@/domain/models';
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory';

//Verifica se tem token, se tiver salva no localStorage
export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set('account', account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account');
};
