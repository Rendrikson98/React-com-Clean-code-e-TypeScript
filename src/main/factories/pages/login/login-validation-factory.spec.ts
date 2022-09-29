import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { MakeLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = MakeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        //chama diretamente a classe do validador
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        //não utilizo dessa forma pq pode mascarar o resultado
        // ...ValidationBuilder.field('email').required().email().build(),
        // ...ValidationBuilder.field('password').required().min(5).build(),
      ])
    );
  });
});
