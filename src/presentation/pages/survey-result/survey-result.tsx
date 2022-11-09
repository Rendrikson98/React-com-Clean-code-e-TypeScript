import { Footer, Header } from '@/presentation/componentes';
import React, { useEffect, useState } from 'react';
import Styles from './survey-result-style.scss';

import Loading from '@/presentation/componentes/loading/loading';
import { LoadSuveyResult, SaveSuveyResult } from '@/domain/usecases';
import { Error } from '../survey-list/components';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyResultContext, SurveyResultData } from './components';

type Props = {
  loadSurveyResult: LoadSuveyResult;
  saveSurveyResult: SaveSuveyResult;
};

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({
      ...state,
      surveyResult: null,
      isLoading: false,
      error: error.message,
    });
  });
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSuveyResult.Model,
    reload: false,
  });

  const onAnswer = (answer: string): void => {
    setState((old) => ({ ...old, isLoading: true }));
    saveSurveyResult
      .save({ answer })
      .then((surveyResult) =>
        setState((old) => ({ ...old, isLoading: false, surveyResult }))
      )
      .catch(handleError);
  };

  const reload = (): void => {
    setState((old) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !old.reload,
    }));
  };

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((old) => ({ ...old, surveyResult })))
      .catch(handleError);
  }, [state.reload]);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && (
            <SurveyResultData surveyResult={state.surveyResult} />
          )}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyResult;
