import faker from 'faker';
import { CompareFieldsValidation } from './compare-fieds-validation';
import { InvalidFieldError } from '@/validation/errors/invalid-field-error';

const makesut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makesut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return error if compare is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = makesut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
