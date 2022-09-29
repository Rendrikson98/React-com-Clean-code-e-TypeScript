import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyList from './survey-list';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { mockAccountModel, mockSurveyListModel } from '@/domain/teste';
import { AccessDeniedError, UnexpectedError } from '@/domain/erros';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { ApiContext } from '@/presentation/contexts';
import { AccountModel } from '@/domain/models';

class LoadSurveyListSpy implements LoadSuveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  async loadAll(): Promise<LoadSuveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <HistoryRouter history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock,
  };
};

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
  });
  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
  test('should render SurveyItems on success', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => screen.getAllByTestId('li'));
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3);
  });
  // test('should logout on AccessDeniedError', async () => {
  //   const loadSurveyListSpy = new LoadSurveyListSpy();
  //   jest
  //     .spyOn(loadSurveyListSpy, 'loadAll')
  //     .mockRejectedValue(new AccessDeniedError()); //mocando a função loadAll e definindo o seu retorno
  //   const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy);
  //   await waitFor(() => screen.getByRole('heading'));
  //   expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
  //   expect(history.location.pathname).toBe('/login');
  // });
  // test('should render SurveyItems on failure', async () => {
  //   const loadSurveyListSpy = new LoadSurveyListSpy();
  //   const error = new UnexpectedError();
  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValue(error); //mocando a função loadAll e definindo o seu retorno
  //   makeSut(loadSurveyListSpy);
  //   await waitFor(() => screen.getByRole('heading'));
  //   screen.debug();
  //   expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  // });
});
