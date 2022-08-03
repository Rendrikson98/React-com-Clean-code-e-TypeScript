import React, { useContext } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const getStatus = (): string => {
    //essa validação funciona da seguinte forma, quando termos erro é retornada a frase de erro
    //e quando não temos erro é retornado undefined, por isso se error for unidefined é falso e vai pra bolinha verde de ok
    return error ? '🔴' : '🟢';
  };
  const getTitle = (): string => {
    return error || 'Tudo certo!';
  };
  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
