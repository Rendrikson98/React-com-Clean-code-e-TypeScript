// eslint-disable-next-line no-unused-vars

import { SurveyResultModel } from '../models';

export interface LoadSuveyResult {
  load(): Promise<LoadSuveyResult.Model>;
}

//o nome dessa padrão é TypeAlias onde criamos um namspace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace
export namespace LoadSuveyResult {
  export type Model = SurveyResultModel;
}
