import { mockAccountModel } from '@/domain/teste';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { setCurrentAccountAdapter } from './current-account-adapter';

jest.mock('@/infra/cache/local-storage-adapter'); // vai mockar todos os objetos internos e não vai usar o localStorage de fato
//caso queira ver isso na prática coloque um console logo depois do expect com o localStorage, faço rodar com o mock e sem o mock e vc verá que sem ele salva no localStorage

describe('current-account-adapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });
});
