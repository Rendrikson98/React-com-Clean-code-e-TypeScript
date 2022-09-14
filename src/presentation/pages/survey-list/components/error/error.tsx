import React, { useContext } from 'react';
import { SurveyContext } from '..';
import Styles from './error-style.scss';

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  );
};

export default Error;
