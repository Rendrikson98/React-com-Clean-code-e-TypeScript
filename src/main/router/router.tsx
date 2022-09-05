import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MakeLogin from '@/main/factories/pages/login/login-factory';
import MakeSignUp from '@/main/factories/pages/signUp/signUp-factory';
import SurveyList from '@/presentation/pages/survey-list/survey-list';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<MakeSignUp />} />
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
