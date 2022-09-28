import { UnexpectedError } from '@/domain/erros';
import { mockAccountModel } from '@/domain/teste';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from './current-account-adapter';

jest.mock('@/infra/cache/local-storage-adapter'); // vai mockar todos os objetos internos e não vai usar o localStorage de fato
//caso queira ver isso na prática coloque um console logo depois do expect com o localStorage, faço rodar com o mock e sem o mock e vc verá que sem ele salva no localStorage

describe('current-account-adapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
