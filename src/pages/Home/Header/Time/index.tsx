import { useEffect, useState } from 'react';
import styles from './Time.module.scss';

export default function Time() {
  const [clock, setClock] = useState<any | null>(null);
  const [day, setDay] = useState<any | null>(null);

  useEffect(() => {
    const getDay = () => {
      const date = new Date();
      const day = date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setDay(day);
    };
    getDay();
  }, []);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hora = date.getHours();
      const minutos = date.getMinutes();
      const clock = `${hora < 10 ? `0${hora}` : hora}:${
        minutos < 10 ? `0${minutos}` : minutos
      }`;
      setClock(clock);
    }, 1000);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.hourDays}>
        <h1 className={styles.hours}>{clock}</h1>
        <h2 className={styles.days}>{day}</h2>
      </div>
    </div>
  );
}
