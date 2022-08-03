import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '../../protocols/FieldValidation';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}
  validate(value: string): Error {
    return new InvalidFieldError();
  }
}
