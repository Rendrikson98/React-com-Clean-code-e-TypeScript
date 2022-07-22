import React from 'react';
import Login from '@/presentation/pages/login/login';
import { MakeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { MakeLoginValidation } from './login-validation-factory';

const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={MakeRemoteAuthentication()}
      validation={MakeLoginValidation()}
    />
  );
};

export default MakeLogin;
