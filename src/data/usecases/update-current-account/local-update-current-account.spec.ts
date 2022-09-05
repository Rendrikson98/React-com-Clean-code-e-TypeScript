import { SetStorageMock } from '@/data/test/mock-storage';
import { mockAccountModel } from '@/domain/teste';
import { LocalUpdateCurrentAccount } from './local-update-current-account';

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe('LocalUpdateCurrentAccount', () => {
  it('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccountModel();
    await sut.save(account);

    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });
  it('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save(mockAccountModel());

    await expect(promise).rejects.toThrow(new Error());
  });
});
