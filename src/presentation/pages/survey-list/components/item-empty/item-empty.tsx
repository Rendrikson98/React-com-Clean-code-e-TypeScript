import { Icon, IconName } from '@/presentation/componentes';
import React from 'react';
import Styles from './item-empty-style.scss';

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
    </>
  );
};

export default SurveyItemEmpty;
