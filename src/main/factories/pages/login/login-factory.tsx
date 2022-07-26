import React from 'react';
import Login from '@/presentation/pages/login/login';
import { MakeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { MakeLoginValidation } from './login-validation-factory';
import { SaveAccessTokenMock } from '@/presentation/test/mock-save-access-token';

const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={MakeRemoteAuthentication()}
      validation={MakeLoginValidation()}
      saveAccessToken={new SaveAccessTokenMock()} //mudar pra o saveAccssToken de verdade
    />
  );
};

export default MakeLogin;
