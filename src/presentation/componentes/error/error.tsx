import React from 'react';
import Styles from './error-style.scss';

type Props = {
  error: string;
  reload: () => void;
};

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button onClick={reload}>Tentar novamente</button>
    </div>
  );
};

export default Error;
