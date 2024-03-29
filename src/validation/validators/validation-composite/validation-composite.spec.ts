import { FieldvalidationSpy } from '../../test';
import { ValidationComposite } from './validation-composite';
import faker from 'faker';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldvalidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldvalidationSpy(fieldName),
    new FieldvalidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);
  /* Podia ser feito assim
  const sut = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('email').required().email().build()
  ]);*/
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBe(errorMessage);
  });

  test('Should return success', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
