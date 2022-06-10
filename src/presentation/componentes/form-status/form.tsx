import Spinner from '@/presentation/componentes/spinner/spinner';
import React, {useContext} from 'react';
import Styles from './form-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

const Form: React.FC = () => {
  const {state} = useContext(Context);
  const {isLoading, mainError} = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default Form