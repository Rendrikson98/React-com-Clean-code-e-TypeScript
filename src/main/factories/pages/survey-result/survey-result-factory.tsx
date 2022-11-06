import React from 'react';
import { SurveyResult } from '@/presentation/pages';
import { MakeRemoteSurveyResult } from '../../usecases/load-survey-result/remote-load-survey-result';
import { useParams } from 'react-router-dom';

const MakeSurveyResult: React.FC = () => {
  const { id } = useParams();
  return <SurveyResult loadSurveyResult={MakeRemoteSurveyResult(id)} />;
};

export default MakeSurveyResult;
