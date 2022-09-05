import { SetStorage } from '@/data/Protocols/http/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
