import { Calendar } from '@/presentation/componentes';
import FlipMove from 'react-flip-move';
import React from 'react';
import { LoadSuveyResult } from '@/domain/usecases';
import Styles from './result-style.scss';
import { SurveyResultAnswer } from '..';

type Props = {
  surveyResult: LoadSuveyResult.Model;
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const goBack = (): void => {
    window.history.back();
  };

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answerList}>
        <>
          {surveyResult.answers.map((answer) => (
            <SurveyResultAnswer key={answer.answer} answer={answer} />
          ))}
        </>
      </FlipMove>
      <button
        className={Styles.button}
        data-testid="back-button"
        onClick={goBack}
      >
        Voltar
      </button>
    </>
  );
};

export default Result;
