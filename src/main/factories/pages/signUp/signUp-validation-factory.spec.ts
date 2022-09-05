import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder';
import { MakeSignUpValidation } from './signUp-validation-factory';

describe('SignupValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = MakeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build(),
      ])
    );
  });
});
