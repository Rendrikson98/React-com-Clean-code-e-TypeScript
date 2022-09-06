import { GetStorage } from '@/data/Protocols/cache';
import { SetStorage } from '@/data/Protocols/cache/set-storage';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage & GetStorage => {
  return new LocalStorageAdapter();
};
