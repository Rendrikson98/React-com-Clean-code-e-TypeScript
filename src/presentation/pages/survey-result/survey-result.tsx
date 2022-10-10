import { Calendar, Footer, Header, Spinner } from '@/presentation/componentes';
import React from 'react';
import Styles from './survey-result-style.scss';
import FlipMove from 'react-flip-move';
import Loading from '@/presentation/componentes/loading/loading';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap} />
          <h2>Qual é seu framework web favorito?</h2>
        </hgroup>
        <FlipMove className={Styles.answerList}>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
