import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import PrivateRoute from './private-route';
import { ApiContext } from '@/presentation/contexts';
import { mockAccountModel } from '@/domain/teste';

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <HistoryRouter history={history}>
        <PrivateRoute history={history} />
      </HistoryRouter>
    </ApiContext.Provider>
  );
  return { history };
};

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty ', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/login');
  });
  test('Should render curent component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});
