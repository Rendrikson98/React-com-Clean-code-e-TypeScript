import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import 'jest-localstorage-mock';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import Login from './login';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import { Helper } from '../../test';
import { ApiContext } from '@/presentation/contexts';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};
type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <HistoryRouter history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    authenticationSpy,
    setCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.testChildCount('error-wrap', 0);
    screen.getByTestId('submit') as HTMLButtonElement;
    Helper.testButtonIsDisable('submit', true);
    Helper.testStatusForfield('email', validationError);
    Helper.testStatusForfield('password', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testStatusForfield('email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testStatusForfield('password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    makeSut();
    Helper.populateField('email');
    Helper.testStatusForfield('email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    makeSut();
    Helper.populateField('password');
    Helper.testStatusForfield('password');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.testButtonIsDisable('submit', false);
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    Helper.testElementExists('spinner');
  });

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should call not Authentication is form is invalid', () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    Helper.populateField('password');
    fireEvent.submit(screen.getByTestId('form'));
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

  // test('Should go to signup page', async () => {
  //   await waitFor(() => {
  //     screen.getByTestId('signup-link');
  //   });
  //   const register = screen.getByTestId('signup-link');
  //   fireEvent.click(register);
  //   expect(history.location.pathname).toBe('/signup');
  // });
});
