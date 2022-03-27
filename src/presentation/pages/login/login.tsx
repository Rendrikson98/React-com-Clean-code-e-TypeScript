import Spinner from '@/presentation/pages/login/componentes/spinner/spinner';
import React from "react";
import Footer from './componentes/footer/footer';
import Input from './componentes/input/input';
import Header from './componentes/login-header/login-header';
import Styles from './login-styles.scss';
type Props = {}

const Login = (props: Props) => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        < Input type='email' name='email' placeholder='Digite seu e-mail' />
        < Input type='password' name='password' placeholder='Digite sua senha' />
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login