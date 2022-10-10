import React from 'react';

import Style from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

const Spinner: React.FC<Props> = (props: Props) => {
  const negativeclass = props.isNegative ? Style.negative : '';
  return (
    <div
      {...props}
      data-testid="spinner"
      className={[Style.spinner, negativeclass, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
