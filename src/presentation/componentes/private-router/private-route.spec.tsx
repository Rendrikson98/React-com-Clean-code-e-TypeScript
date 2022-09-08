import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import PrivateRoute from './private-route';

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <HistoryRouter history={history}>
      <PrivateRoute history={history} />
    </HistoryRouter>
  );
  return { history };
};

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty ', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/login');
  });
});
