import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MakeLogin from '@/main/factories/pages/login/login-factory';
import MakeSignUp from '@/main/factories/pages/signUp/signUp-factory';
import SurveyList from '@/presentation/pages/survey-list/survey-list';
import ApiContext from '../../presentation/contexts/api/api-context';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import PrivateRouter from '@/presentation/componentes/private-router/private-route';

const Router: React.FC = () => {
  return (
    //utizo meu contexto criado no presentation/contexts
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<MakeSignUp />} />
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/" element={<SurveyList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
