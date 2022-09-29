import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../contexts';

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const history = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  //vai retornar uma função com essa assinatura ():void => {}
  return (): void => {
    //vai deslogar o usuário e mandar ele pra tela de login
    setCurrentAccount(undefined);
    history('/login');
  };
};
