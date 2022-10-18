import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyResult from './survey-result';
import { ApiContext } from '@/presentation/contexts';
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/teste';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

//aula 10

type SutTypes = {
  loadSurveyResultspy: LoadSurveyResultSpy;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const loadSurveyResultspy = new LoadSurveyResultSpy();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <HistoryRouter history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultspy} />
      </HistoryRouter>
    </ApiContext.Provider>
  );

  return {
    loadSurveyResultspy,
  };
};
describe('SurveyResult', () => {
  it('should presente correct inital satate', async () => {
    makeSut();
    const surveResult = screen.getByTestId('survey-result');
    expect(surveResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => {
      surveResult;
    });
  });
  it('should call LoadSurveyResult', async () => {
    const { loadSurveyResultspy } = makeSut();
    await waitFor(() => {
      screen.getByTestId('survey-result');
    });
    expect(loadSurveyResultspy.callsCount).toBe(1);
  });
});
