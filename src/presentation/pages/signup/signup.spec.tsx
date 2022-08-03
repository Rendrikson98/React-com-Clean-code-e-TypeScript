import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Signup from './Signup';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Signup />);
  return {
    sut,
  };
};

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

const testStatusForfield = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testButtonIsDisable = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(el.disabled).toBe(isDisabled);
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
    testChildCount(sut, 'error-wrap', 0);
    testButtonIsDisable(sut, 'submit', true);
    testStatusForfield(sut, 'name', validationError);
    testStatusForfield(sut, 'email', validationError);
    testStatusForfield(sut, 'password', validationError);
    testStatusForfield(sut, 'passwordConfirmation', validationError);
  });
});
