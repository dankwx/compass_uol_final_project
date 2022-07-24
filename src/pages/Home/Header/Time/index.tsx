import { useEffect, useState } from 'react';
import styles from './Time.module.scss';
import Logo from './compassLogo.png';

export default function Time() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [day, setDay] = useState<any | null>(null);

  // este useEffect serrve para pegar a data atual e colocar no state Day
  // this useEffect is used to get the current date and put it in the state Day
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

  const [clock, setClock] = useState<any | null>(null);

  // este useEffect serrve para pegar a hora atual e colocar no state Clock
  // this useEffect is used to get the current time and put it in the state Clock
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
      <img
        className={styles.compassLogoo}
        src={Logo}
        alt='Compass Logo for header'
      />
      <div className={styles.hourDays}>
        <h1 className={styles.hours}>{clock}</h1>
        <h2 className={styles.days}>{day}</h2>
      </div>
    </div>
  );
}
