import { useEffect, useState } from "react";
import styles from "./Time.module.scss";

export default function Time() {
  const [relogio, setRelogio] = useState<any | null>(null);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hora = date.getHours();
      const minutos = date.getMinutes();
      setRelogio(`${hora}:${minutos}`);
    }, 1000);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.hourDays}>
        <h1 className={styles.hours}>{relogio}</h1>
        <h2 className={styles.days}>terça-feira, 17 de março de 2020</h2>
      </div>
    </div>
  );
}
