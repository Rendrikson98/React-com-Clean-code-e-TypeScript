import React from 'react';
import { MakeSignUpValidation } from './signUp-validation-factory';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/save-accesss-token/local-save-access-token-factory';
import { MakeRemoteAddAccount } from '../../usecases/addAccount/remote-add-account-factory';
import { Signup } from '@/presentation/pages';

const MakeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={MakeRemoteAddAccount()}
      validation={MakeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};

export default MakeSignUp;
