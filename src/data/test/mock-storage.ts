import { SetStorage } from '../Protocols/cache/set-storage';

export class SetStorageMock implements SetStorage {
  key: string;
  value: any;
  set(key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}
