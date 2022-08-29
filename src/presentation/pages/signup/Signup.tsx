import React, { useEffect, useState } from 'react';
import { Footer, Form, Input, LoginHeader } from '../../componentes';
import Styles from './signup-style.scss';
import Context from '@/presentation/contexts/form/form-context';
import { Link, useNavigate } from 'react-router-dom';
import { Validation } from '@/presentation/protocols/validation';

type Props = {
  validation: Validation;
};

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      //Aplicando a validação dos inputs
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      ),
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            data-testid="submit"
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            } //Se tiver error o botão é desabilitado
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar Para o Login</span>
          <Form />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Signup;
