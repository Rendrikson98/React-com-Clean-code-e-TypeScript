import React, { useState, useEffect, useContext } from 'react';
import { Footer, Form, Input, LoginHeader } from '../../componentes';
import Styles from './login-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from '@/presentation/componentes/submit-button/submit-button';
import { ApiContext } from '@/presentation/contexts';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  //Forma tradicional de ser feita
  // useEffect(() => {
  //   const { email, password } = state;
  //   const formData = { email, password };
  //   const emailError = validation.validate('email', formData);
  //   const passwordError = validation.validate('password', formData);
  //   // A utilização de callback no useState garante que um useState não sobrescreva o outro
  //   setState((old) => ({
  //     //Ao inves de fazer o destructure do estado diretamente a gente faz o estado antigo vindo da callback
  //     ...old,
  //     //Aplicando a validação dos inputs
  //     emailError,
  //     passwordError,
  //     isFormInvalid: !!emailError || !!passwordError,
  //   }));
  // }, [state.email, state.password]);

  useEffect(() => {
    validate('email');
  }, [state.email]);

  useEffect(() => {
    validate('password');
  }, [state.password]);

  //função auxiliar que executa a lógica dentro do useEffect
  const validate = (field: string): void => {
    const { email, password } = state;
    const formData = { email, password };
    // A utilização de callback no useState garante que um useState não sobrescreva o outro
    setState((old) => ({
      //Ao inves de fazer o destructure do estado diretamente a gente faz o estado antigo vindo da callback
      ...old,
      //Aplicando a validação dos inputs
      [`${field}Error`]: validation.validate(`${field}`, formData),
    }));
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.emailError || !!old.passwordError,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      setCurrentAccount(account);
      history('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
      console.log(state.mainError);
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton text="Entrar" />
          <Link
            data-testid="signup-link"
            to={'/signup'}
            className={Styles.link}
          >
            Criar conta
          </Link>
          <Form />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
