import { SetStorage } from '@/data/Protocols/http/cache/set-storage';
import { SaveAccessToken } from '@/domain/usecases/save-access-token';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  async save(acessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', acessToken);
  }
}
