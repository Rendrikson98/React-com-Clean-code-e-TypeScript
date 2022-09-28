import faker from 'faker';
import { LoadSuveyList } from '../usecases/load-suvery-list';

export const mockSurveyModel = (): LoadSuveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.random.boolean(),
  date: faker.date.recent(),
});

export const mockSurveyListModel = (): LoadSuveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
