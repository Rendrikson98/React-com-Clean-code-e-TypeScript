import { HttpClient } from '@/data/Protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';

//responsável por decorar as autenticações do localStorage e passar para o axios
export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
};
