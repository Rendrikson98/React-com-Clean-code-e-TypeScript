import { HttpGetClient } from '@/data/Protocols/http';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';

//responsável por decorar as autenticações do localStorage e passar para o axios
export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
};
