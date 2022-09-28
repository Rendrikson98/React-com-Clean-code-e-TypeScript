import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Icon, IconName } from '@/presentation/componentes';
import React from 'react';
import Styles from './item-style.scss';

type Props = {
  survey: LoadSuveyList.Model;
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;
  return (
    <li className={Styles.surveyItemWrap} data-testid="li">
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
            {/*o padStart serve para informar que vai ter no máximo 2 caractere e se não tiver adiciona o 0 no inicio*/}
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