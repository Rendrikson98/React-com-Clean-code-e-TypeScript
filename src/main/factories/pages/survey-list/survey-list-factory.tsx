import React from 'react';
import SurveyList from '@/presentation/pages/survey-list/survey-list';
import { MakeRemoteSurveyList } from '../../usecases/load-survey-list/remote-load-seuvey-list';

const MakeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={MakeRemoteSurveyList()} />;
};

export default MakeSurveyList;
