import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Signup from './Signup';
import { Helper } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Signup />);
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
    const { sut } = makeSut();
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisable(sut, 'submit', true);
    Helper.testStatusForfield(sut, 'name', validationError);
    Helper.testStatusForfield(sut, 'email', validationError);
    Helper.testStatusForfield(sut, 'password', validationError);
    Helper.testStatusForfield(sut, 'passwordConfirmation', validationError);
  });
});
