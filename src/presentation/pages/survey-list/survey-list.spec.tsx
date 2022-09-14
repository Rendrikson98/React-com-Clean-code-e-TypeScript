import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyList from './survey-list';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { SurveyModel } from '@/domain/models';
import { mockSurveyListModel } from '@/domain/teste';

class LoadSurveyListSpy implements LoadSuveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
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
});