import { fireEvent, RenderResult, screen } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

export const testStatusForfield = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

export const testButtonIsDisable = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const el = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(el.disabled).toBe(isDisabled);
};

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value: value } });
};

export const testElementExists = (fieldName: string) => {
  const el = screen.getByTestId(fieldName);
  expect(el).toBeTruthy();
};
