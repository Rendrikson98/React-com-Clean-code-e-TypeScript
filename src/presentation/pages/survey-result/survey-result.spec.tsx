import { render, screen } from '@testing-library/react';
import SurveyResult from './survey-result';
import React from 'react';
import { ApiContext } from '@/presentation/contexts';
import { mockAccountModel } from '@/domain/teste';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
describe('SurveyResult', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  it('should presente correct inital satate', () => {
    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: jest.fn(),
          getCurrentAccount: () => mockAccountModel(),
        }}
      >
        <HistoryRouter history={history}>
          <SurveyResult />
        </HistoryRouter>
      </ApiContext.Provider>
    );
    const surveResult = screen.getByTestId('survey-result');
    expect(surveResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
