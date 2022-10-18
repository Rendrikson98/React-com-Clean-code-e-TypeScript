import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import React from 'react';
import SurveyItemEmpty from '../item-empty/item-empty';
import SurveyItem from '../item/item';
import Styles from './list-style.scss';

type Props = {
  surveys: LoadSuveyList.Model[];
};

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey: LoadSuveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
