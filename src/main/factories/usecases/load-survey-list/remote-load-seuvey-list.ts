import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { MakeApiURL } from '../../http/api-url-factory';

export const MakeRemoteSurveyList = (): LoadSuveyList => {
  return new RemoteLoadSurveyList(MakeApiURL('surveys'), makeAxiosHttpClient());
};
