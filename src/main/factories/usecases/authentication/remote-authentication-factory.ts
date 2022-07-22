import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authetication';
import { Authentication } from '@/domain/usecases';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { MakeApiURL } from '../../http/api-url-factory';

export const MakeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(MakeApiURL('login'), makeAxiosHttpClient());
};
