import Spinner from '@/presentation/pages/login/componentes/spinner/spinner';
import React from 'react';
import Styles from './form-styles.scss';

const Form = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  )
}

export default Form