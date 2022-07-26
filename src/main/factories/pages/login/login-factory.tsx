import React from 'react';
import Login from '@/presentation/pages/login/login';
import { MakeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { MakeLoginValidation } from './login-validation-factory';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-accesss-token/local-save-access-token-factory';

const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={MakeRemoteAuthentication()}
      validation={MakeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};

export default MakeLogin;
