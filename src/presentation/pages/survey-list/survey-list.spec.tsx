import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyList from './survey-list';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { mockAccountModel, mockSurveyListModel } from '@/domain/teste';
import { UnexpectedError } from '@/domain/erros';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ApiContext } from '@/presentation/contexts';

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
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <HistoryRouter history={createMemoryHistory()}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    loadSurveyListSpy,
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
