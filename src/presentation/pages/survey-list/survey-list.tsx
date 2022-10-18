import { LoadSuveyList } from '@/domain/usecases/load-suvery-list';
import { Footer, Header } from '@/presentation/componentes';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect, useState } from 'react';
import { SurveyContext, SurveyListItem, Error } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSuveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message });
  });
  const [state, setState] = useState({
    surveys: [] as LoadSuveyList.Model[],
    error: '',
    reload: false,
  });

  const reload = (): void => {
    setState((old) => ({
      surveys: [],
      error: '',
      reload: !old.reload,
    }));
  };

  useEffect(() => {
    const fetchLoading = async () => {
      try {
        const surveys = await loadSurveyList.loadAll();
        setState({ ...state, surveys });
      } catch (error) {
        //chamo meu hook que tranta o erro de acesso negado
        handleError(error);
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
          {state.error ? (
            <Error error={state.error} reload={reload} />
          ) : (
            <SurveyListItem />
          )}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
