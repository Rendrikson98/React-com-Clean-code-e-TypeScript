import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Footer, Header } from '@/presentation/componentes';
import React, { useEffect } from 'react';
import { SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSuveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll();
    })();
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquestes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
