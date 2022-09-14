import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyItem from './survey-item';
import { mockSurveyModel } from '@/domain/teste';
import { IconName } from '@/presentation/componentes';

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date('2020-01-10T00:00:00');
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('moth')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
});
