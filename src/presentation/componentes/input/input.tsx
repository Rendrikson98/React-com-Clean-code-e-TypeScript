import React, { useContext, useRef } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>(); // informo que minha ref é do tipo input

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
        ref={inputRef} // pego a refe do input
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label
        onClick={() => {
          inputRef.current.focus(); // quando clico no label faço ele chamar o focus do input para disparar o css
        }}
      >
        {props.placeholder}
      </label>
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
