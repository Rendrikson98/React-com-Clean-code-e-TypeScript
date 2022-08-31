import { RequiredFieldError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker';

const makesut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field);

describe('RequireFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makesut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });
  test('Should return error if field is not empty', () => {
    const field = faker.database.column();
    const sut = makesut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
