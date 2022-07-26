import { SetStorage } from '../Protocols/http/cache/set-storage';

export class SetStorageMock implements SetStorage {
  key: string;
  value: any;
  async set(key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
  }
}