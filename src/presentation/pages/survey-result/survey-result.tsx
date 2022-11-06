import { Calendar, Footer, Header } from '@/presentation/componentes';
import React, { useEffect, useState } from 'react';
import Styles from './survey-result-style.scss';
import FlipMove from 'react-flip-move';
import Loading from '@/presentation/componentes/loading/loading';
import { LoadSuveyResult } from '@/domain/usecases';
import { Error } from '../survey-list/components';
import { LoadSurveyResultSpy } from '@/domain/teste';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSurveyResult: LoadSurveyResultSpy;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, surveyResult: null, error: error.message });
  });
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSuveyResult.Model,
    reload: false,
  });

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
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answerList}>
              {state.surveyResult.answers.map((answer) => (
                <li
                  data-testid="answer-wrap"
                  key={answer.answer}
                  className={answer.isCurrentAccountAnswer ? Styles.active : ''}
                >
                  {answer.image && (
                    <img
                      data-testid="image"
                      src={answer.image}
                      alt={answer.answer}
                    />
                  )}

                  <span data-testid="answer" className={Styles.answer}>
                    {answer.answer}
                  </span>
                  <span data-testid="percent" className={Styles.percent}>
                    {answer.percent}%
                  </span>
                </li>
              ))}
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
