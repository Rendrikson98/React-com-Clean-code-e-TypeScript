import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from './header';
import { ApiContext } from '@/presentation/contexts';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
describe('Header Component', () => {
  test('Should call setCurrentAccount with null', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </ApiContext.Provider>
    );
    await act(async () => {
      await fireEvent.click(screen.getByTestId('logout'));
    });
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
