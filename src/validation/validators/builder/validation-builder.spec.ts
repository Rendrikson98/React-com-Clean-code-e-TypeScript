import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';
import faker from 'faker';
import { CompareFieldsValidation } from '../compare-fields/compare-fieds-validation';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('should return MinLengthValidation', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = ValidationBuilder.field(field).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const length = faker.random.number();
    const validations = ValidationBuilder.field(field)
      .sameAs(fieldToCompare)
      .build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test('should return a list of validations', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(length)
      .email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
