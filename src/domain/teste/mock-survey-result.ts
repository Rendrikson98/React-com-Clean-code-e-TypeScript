import faker from 'faker';
import { LoadSuveyResult } from '../usecases';
import { SaveSuveyResult } from '../usecases/save-suvery-result';

export const mockSaveSurveyResultParams = (): SaveSuveyResult.Params => ({
  answer: faker.random.words(10),
});

export const mockSurveyResultModel = (): LoadSuveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: false,
    },
  ],
});

export class LoadSurveyResultSpy implements LoadSuveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();
  async load(): Promise<LoadSuveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
