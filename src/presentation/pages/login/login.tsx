import React from "react";
import { Footer, Form, Input, LoginHeader } from './componentes';
import Styles from './login-styles.scss';
type Props = {}

const Login = (props: Props) => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        < Input type='email' name='email' placeholder='Digite seu e-mail' />
        < Input type='password' name='password' placeholder='Digite sua senha' />
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <Form />
      </form>
      <Footer />
    </div>
  )
}

export default Login