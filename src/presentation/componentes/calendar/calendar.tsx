import React from 'react';
import Styles from './calendar-styles.scss';

type Props = {
  date: Date;
  className?: string;
};

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={[Styles.calendarWrap, className].join(' ')}>
      <span data-testid="day" className={Styles.day}>
        {date.getDate().toString().padStart(2, '0')}
        {/*o padStart serve para informar que vai ter no máximo 2 caractere e se não tiver adiciona o 0 no inicio*/}
      </span>
      <span data-testid="moth" className={Styles.month}>
        {date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
        {/*Converte para o padrão brasileiro */}
      </span>
      <span data-testid="year" className={Styles.year}>
        {date.getFullYear()}
      </span>
    </time>
  );
};

export default Calendar;
