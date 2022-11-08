import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyResult from './survey-result';
import { ApiContext } from '@/presentation/contexts';
import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSaveSurveyResultParams,
  mockSurveyResultModel,
  SaveSurveyResultSpy,
} from '@/domain/teste';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

//aula 10

type SutTypes = {
  loadSurveyResultspy: LoadSurveyResultSpy;
  saveSurveyResultspy: SaveSurveyResultSpy;
};

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const loadSurveyResultspy = new LoadSurveyResultSpy();
  loadSurveyResultspy.surveyResult = surveyResult;

  const saveSurveyResultspy = new SaveSurveyResultSpy();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <HistoryRouter history={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultspy}
          saveSurveyResult={saveSurveyResultspy}
        />
      </HistoryRouter>
    </ApiContext.Provider>
  );

  return {
    loadSurveyResultspy,
    saveSurveyResultspy,
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
  it('should present SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00'),
    });
    makeSut(surveyResult);
    await waitFor(() => {
      screen.getByTestId('question');
    });
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('moth')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyResult.question
    );
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    const imagesWrap = screen.queryAllByTestId('answer-wrap');
    expect(imagesWrap[0]).toHaveClass('active');
    expect(imagesWrap[1]).not.toHaveClass('active');
    const image = screen.queryAllByTestId('image');
    expect(image[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(image[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(image[1]).toBeFalsy();
    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(
      `${surveyResult.answers[0].percent}%`
    );
    expect(percents[1]).toHaveTextContent(
      `${surveyResult.answers[1].percent}%`
    );
  });
});
