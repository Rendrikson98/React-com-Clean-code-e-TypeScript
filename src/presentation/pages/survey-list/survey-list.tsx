import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Footer, Header } from '@/presentation/componentes';
import React, { useEffect, useState } from 'react';
import { SurveyContext, SurveyListItem, Error } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSuveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSuveyList.Model[],
    error: '',
    reload: false,
  });
  useEffect(() => {
    const fetchLoading = async () => {
      try {
        const surveys = await loadSurveyList.loadAll();
        setState({ ...state, surveys });
      } catch (error) {
        setState({ ...state, error: error.message });
      }
    };

    fetchLoading();
  }, [state.reload]);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquestes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
