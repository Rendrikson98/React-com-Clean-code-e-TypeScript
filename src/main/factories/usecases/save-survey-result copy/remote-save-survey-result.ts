import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result copy/remote-save-survey-result';
import { SaveSuveyResult } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../../decorators';
import { MakeApiURL } from '../../http/api-url-factory';

export const MakeRemoteSaveSurveyResult = (id: string): SaveSuveyResult => {
  return new RemoteSaveSurveyResult(
    MakeApiURL(`surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
