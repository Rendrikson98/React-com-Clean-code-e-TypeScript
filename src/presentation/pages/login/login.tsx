import Spinner from '@/presentation/pages/login/componentes/spinner/spinner';
import React from "react";
import Footer from './componentes/footer/footer';
import Header from './componentes/login-header/login-header';
import Styles from './login-styles.scss';
type Props = {}

const Login = (props: Props) => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type='email' name='email' placeholder='Digite seu e-mail' />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type='password' name='password' placeholder='Digite sua senha' />
          <span className={Styles.status}>🔴</span>
        </div>

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