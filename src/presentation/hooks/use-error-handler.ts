import { AccessDeniedError } from '@/domain/erros';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../contexts';

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const history = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  //vai retornar uma função com essa assinatura (error: Error):void => {}
  return (error: Error): void => {
    //se der error de acesso negado ele limpa o local storage e manda o usuário para o login
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history('/login');
    } else {
      callback(error);
    }
  };
};
