import { mockGetrequest } from '@/data/test';
import { GetStorageSpy } from '@/data/test/mock-cache';
import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
  return {
    sut,
    getStorageSpy,
  };
};
describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetSotrage with correct value', () => {
    const { sut, getStorageSpy } = makeSut();
    sut.get(mockGetrequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
