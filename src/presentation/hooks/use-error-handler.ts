import { AccessDeniedError } from '@/domain/erros';
import { useLogout } from './use-logout';

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const logout = useLogout();
  //vai retornar uma função com essa assinatura (error: Error):void => {}
  return (error: Error): void => {
    //se der error de acesso negado ele limpa o local storage e manda o usuário para o login com o hooke logout(), se não ele executa o que foi passado para o callback
    if (error instanceof AccessDeniedError) {
      logout();
    } else {
      callback(error);
    }
  };
};
