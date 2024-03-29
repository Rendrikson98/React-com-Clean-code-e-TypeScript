import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '../../protocols/FieldValidation';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}
  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
