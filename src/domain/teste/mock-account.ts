import faker from 'faker';
import { AccountModel } from '../models';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
  name: faker.random.word(),
});
