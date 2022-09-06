import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import PrivateRoute from './private-route';

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty ', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <HistoryRouter history={history}>
        <PrivateRoute history={history} />
      </HistoryRouter>
    );
    expect(history.location.pathname).toBe('/login');
  });
});
