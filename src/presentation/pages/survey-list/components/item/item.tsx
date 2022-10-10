import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Calendar, Icon, IconName } from '@/presentation/componentes';
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
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};

export default SurveyItem;
