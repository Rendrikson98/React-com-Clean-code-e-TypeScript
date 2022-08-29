import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MakeLogin from '@/main/factories/pages/login/login-factory';
import { Signup } from '@/presentation/pages';
import { AddAccountSpy, ValidationStub } from '@/presentation/test';

const validationStub = new ValidationStub();
const addAccountSpy = new AddAccountSpy();

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <Signup validation={validationStub} addAccount={addAccountSpy} />
          }
        />
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
