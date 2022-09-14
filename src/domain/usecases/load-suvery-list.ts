// eslint-disable-next-line no-unused-vars
import { SurveyModel } from '../models';

export interface LoadSuveyList {
  loadAll(): Promise<SurveyModel[]>;
}
