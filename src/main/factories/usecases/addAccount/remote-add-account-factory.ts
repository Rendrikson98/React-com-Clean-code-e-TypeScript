import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account';
import { AddAccount } from '@/domain/usecases';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { MakeApiURL } from '../../http/api-url-factory';

export const MakeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(MakeApiURL('signup'), makeAxiosHttpClient());
};
