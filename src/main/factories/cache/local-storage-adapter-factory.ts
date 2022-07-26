import { SetStorage } from '@/data/Protocols/http/cache/set-storage';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};
