import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result';
import { LoadSuveyResult } from '@/domain/usecases';
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators';
import { MakeApiURL } from '../../http/api-url-factory';

export const MakeRemoteSurveyResult = (id: string): LoadSuveyResult => {
  return new RemoteLoadSurveyResult(
    MakeApiURL(`surveys/${id}/results`),
    makeAuthorizeHttpGetClientDecorator()
  );
};
