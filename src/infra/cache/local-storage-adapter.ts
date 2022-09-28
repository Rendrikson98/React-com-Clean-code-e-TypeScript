import { SetStorage, GetStorage } from '@/data/Protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key); //se o valor for undefined ele remove o item do localStorage
    }
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
