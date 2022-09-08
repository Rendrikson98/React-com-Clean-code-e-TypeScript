import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Signup from './Signup';
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/SignUp'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <HistoryRouter history={history}>
        <Signup validation={validationStub} addAccount={addAccountSpy} />
      </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    addAccountSpy,
    setCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  passwordConfirmation = password
): Promise<void> => {
  Helper.populateField('name', name);
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  Helper.populateField('passwordConfirmation', passwordConfirmation);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    makeSut({ validationError });
    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisable('submit', true);
    Helper.testStatusForfield('name', validationError);
    Helper.testStatusForfield('email', validationError);
    Helper.testStatusForfield('password', validationError);
    Helper.testStatusForfield('passwordConfirmation', validationError);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('name');
    Helper.testStatusForfield('name', validationError);
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
    Helper.populateField('password');
    Helper.testStatusForfield('password', validationError);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('passwordConfirmation');
    Helper.testStatusForfield('passwordConfirmation', validationError);
  });

  test('Should show valid name state if Validation succeeds', () => {
    makeSut();
    Helper.populateField('name');
    Helper.testStatusForfield('name');
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut();
    Helper.populateField('passwordConfirmation');
    Helper.testStatusForfield('passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('name');
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.populateField('passwordConfirmation');
    Helper.testButtonIsDisable('submit', false);
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    Helper.testElementExists('spinner');
  });

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.random.word();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordConfirmation = password;
    await simulateValidSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { addAccountSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should call not Authentication is form is invalid', () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    Helper.populateField('password');
    fireEvent.submit(screen.getByTestId('form'));
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should go to login page', async () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.location.pathname).toBe('/login');
  });
});
