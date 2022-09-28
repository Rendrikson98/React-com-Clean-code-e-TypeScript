import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import React, { useContext } from 'react';
import { SurveyContext } from '..';
import SurveyItemEmpty from '../item-empty/item-empty';
import SurveyItem from '../item/item';
import Styles from './list-style.scss';

const List: React.FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey: LoadSuveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
