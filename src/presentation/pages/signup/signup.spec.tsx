import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Signup from './Signup';
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { SaveAccessTokenMock } from '@/presentation/test/mock-save-access-token';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/SignUp'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const sut = render(
    <HistoryRouter history={history}>
      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </HistoryRouter>
  );
  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  passwordConfirmation = password
): Promise<void> => {
  Helper.populateField(sut, 'name', name);
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);
  Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login component', () => {
  afterEach(() => {
    cleanup;
  });
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisable(sut, 'submit', true);
    Helper.testStatusForfield(sut, 'name', validationError);
    Helper.testStatusForfield(sut, 'email', validationError);
    Helper.testStatusForfield(sut, 'password', validationError);
    Helper.testStatusForfield(sut, 'passwordConfirmation', validationError);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'name');
    Helper.testStatusForfield(sut, 'name', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'email');
    Helper.testStatusForfield(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'password');
    Helper.testStatusForfield(sut, 'password', validationError);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForfield(sut, 'passwordConfirmation', validationError);
  });

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name');
    Helper.testStatusForfield(sut, 'name');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'email');
    Helper.testStatusForfield(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'password');
    Helper.testStatusForfield(sut, 'password');
  });

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForfield(sut, 'passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name');
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testButtonIsDisable(sut, 'submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.random.word();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordConfirmation = password;
    await simulateValidSubmit(sut, name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { sut, addAccountSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should call not Authentication is form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });
    Helper.populateField(sut, 'password');
    fireEvent.submit(sut.getByTestId('form'));
    expect(addAccountSpy.callsCount).toBe(0);
  });
});
