import { mockGetrequest } from '@/data/test';
import { GetStorageSpy } from '@/data/test/mock-cache';
import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator';

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetSotrage with correct value', () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetrequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
