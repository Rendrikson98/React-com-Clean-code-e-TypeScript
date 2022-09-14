import { SurveyModel } from '@/domain/models';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Footer, Header } from '@/presentation/componentes';
import React, { useEffect, useState } from 'react';
import { SurveyItem, SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSuveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  });
  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ surveys: surveys }))
      .catch((error) => {
        console.log('teste');
      });
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquestes</h2>
        <ul data-testid="survey-list">
          {console.log(state)}
          {state.surveys.length ? (
            state.surveys.map((survey: SurveyModel) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
