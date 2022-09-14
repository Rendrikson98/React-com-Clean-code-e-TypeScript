import { SurveyModel } from '@/domain/models';
import { Icon, IconName } from '@/presentation/componentes';
import React from 'react';
import Styles from './survey-item-style.scss';

type Props = {
  survey: SurveyModel;
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="moth" className={Styles.month}>
            {survey.date
              .toLocaleDateString('pt-BR', { month: 'short' })
              .replace('.', '')}
            {/*Converte para o padrão brasileiro */}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};

export default SurveyItem;
