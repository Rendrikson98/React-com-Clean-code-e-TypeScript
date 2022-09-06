import React from 'react';
import { MakeSignUpValidation } from './signUp-validation-factory';
import { MakeRemoteAddAccount } from '../../usecases/addAccount/remote-add-account-factory';
import { Signup } from '@/presentation/pages';

const MakeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={MakeRemoteAddAccount()}
      validation={MakeSignUpValidation()}
    />
  );
};

export default MakeSignUp;
