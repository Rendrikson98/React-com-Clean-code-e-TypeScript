import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import 'jest-localstorage-mock';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import Login from './login';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/erros';
import { SaveAccessTokenMock } from '@/presentation/test/mock-save-access-token';
import { Helper } from '../../test';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};
type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <HistoryRouter history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </HistoryRouter>
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email);
  populatepasswordField(sut, password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatepasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};

describe('Login component', () => {
  afterEach(() => {
    cleanup;
  });
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    Helper.testButtonIsDisable(sut, 'submit', true);
    Helper.testStatusForfield(sut, 'email', validationError);
    Helper.testStatusForfield(sut, 'password', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    Helper.testStatusForfield(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatepasswordField(sut);
    Helper.testStatusForfield(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    Helper.testStatusForfield(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatepasswordField(sut);
    Helper.testStatusForfield(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatepasswordField(sut);
    Helper.testButtonIsDisable(sut, 'submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should call not Authentication is form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  /*test('Should call not Authentication is form is invalid', async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error))
        simulateValidSubmit(sut)
        const errorWrap = sut.getByTestId('error-wrap')
        await waitFor(()=>errorWrap)
        const mainError = sut.getByTestId('main-error')
        expect(mainError.textContent).toBe(error.message)
        expect(errorWrap.childElementCount).toBe(1)
    })*/
  /*test('Should add accessToken to localStorage on success', async () => {
        const {sut, authenticationSpy} = makeSut();
        simulateValidSubmit(sut)
        await waitFor(() => sut.getByTestId('form'))
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken);
    })*/

  test('Should go to signup page', async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signup');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
  });
});
