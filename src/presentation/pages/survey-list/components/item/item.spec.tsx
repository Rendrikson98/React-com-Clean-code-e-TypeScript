import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SurveyItem from './item';
import { mockSurveyModel } from '@/domain/teste';
import { IconName } from '@/presentation/componentes';
import { createMemoryHistory, MemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <HistoryRouter history={history}>
      <SurveyItem survey={survey} />
    </HistoryRouter>
  );
  return { history };
};

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00'),
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('moth')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2020-05-03T00:00:00'),
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('moth')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
  // test('should go to surveyResult', () => {
  //   const survey = mockSurveyModel();
  //   const { history } = makeSut(survey);

  //   fireEvent.click(screen.getByTestId('link'));
  //   expect(history.location.pathname).toBe(`/surveys/${survey.id}`);
  // });
});
