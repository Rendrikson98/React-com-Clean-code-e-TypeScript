import React from 'react';
import Login from '@/presentation/pages/login/login';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authetication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';

const MakeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const remoteAuthentication = new RemoteAuthentication(
    url,
    new AxiosHttpClient()
  );
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};

export default MakeLogin;
