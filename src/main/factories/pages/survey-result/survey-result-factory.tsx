import React from 'react';
import { SurveyResult } from '@/presentation/pages';
import { MakeRemoteLoadSurveyResult } from '../../usecases/load-survey-result/remote-load-survey-result';
import { useParams } from 'react-router-dom';
import { MakeRemoteSaveSurveyResult } from '../../usecases/save-survey-result copy/remote-save-survey-result';

const MakeSurveyResult: React.FC = () => {
  const { id } = useParams();
  return (
    <SurveyResult
      loadSurveyResult={MakeRemoteLoadSurveyResult(id)}
      saveSurveyResult={MakeRemoteSaveSurveyResult(id)}
    />
  );
};

export default MakeSurveyResult;
