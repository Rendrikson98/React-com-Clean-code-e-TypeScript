import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Signup from './Signup';
import { Helper, ValidationStub } from '@/presentation/test';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Signup validation={validationStub} />);
  return {
    sut,
  };
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
    Helper.testStatusForfield(sut, 'email', 'Campo obrigatório');
    Helper.testStatusForfield(sut, 'password', 'Campo obrigatório');
    Helper.testStatusForfield(sut, 'passwordConfirmation', 'Campo obrigatório');
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'name');
    Helper.testStatusForfield(sut, 'name', validationError);
  });
});
