import Spinner from '@/presentation/componentes/spinner/spinner';
import React, {useContext} from 'react';
import Styles from './form-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

const Form: React.FC = () => {
  const {isLoading, errorMessage} = useContext(Context);
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>Error</span>}
    </div>
  )
}

export default Form