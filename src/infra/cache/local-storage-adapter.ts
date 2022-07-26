import { SetStorage } from '@/data/Protocols/http/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value);
  }
}
