import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MakeLogin from '@/main/factories/pages/login/login-factory';
import { Signup } from '@/presentation/pages';
import { ValidationStub } from '@/presentation/test';

const validationStub = new ValidationStub();

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<Signup validation={validationStub} />}
        />
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
