import React from 'react';
import { Footer, Form, Input, LoginHeader } from '../../componentes';
import Styles from './signup-style.scss';
import Context from '@/presentation/contexts/form/form-context';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
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
          <button className={Styles.submit} type="submit">
            Entrar
          </button>
          <Link to="/login" className={Styles.link}>
            Voltar Para o Login
          </Link>
          <Form />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Signup;
