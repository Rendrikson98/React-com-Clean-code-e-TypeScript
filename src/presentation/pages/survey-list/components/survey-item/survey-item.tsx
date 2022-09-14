import { Icon, IconName } from '@/presentation/componentes';
import React from 'react';
import Styles from './survey-item-style.scss';

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2022</span>
        </time>
        <p>Qual é seu framework web favorito</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};

export default SurveyItem;
