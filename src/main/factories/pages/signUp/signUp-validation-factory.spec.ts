import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fieds-validation';
import { MakeSignUpValidation } from './signUp-validation-factory';

describe('SignupValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = MakeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        //chama diretamente a classe do validador
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password'),
        //não utilizo dessa forma pq pode mascarar o resultado
        // ...Builder.field('name').required().min(5).build(),
        // ...Builder.field('email').required().email().build(),
        // ...Builder.field('password').required().min(5).build(),
        // ...Builder.field('passwordConfirmation')
        //   .required()
        //   .sameAs('password')
        //   .build(),
      ])
    );
  });
});
