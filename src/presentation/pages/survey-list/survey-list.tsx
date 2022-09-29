import { AccessDeniedError } from '@/domain/erros';
import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Footer, Header } from '@/presentation/componentes';
import { ApiContext } from '@/presentation/contexts';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext, SurveyListItem, Error } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSuveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
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
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          history('/login');
        } else {
          setState({ ...state, error: error.message });
        }
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
