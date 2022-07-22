import styles from './Login.module.scss';
import Form from './Form';
import RightScreen from './RightScreen';
import { useEffect, useState } from 'react';

export default function Login() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (width < 769) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  const number = Number(localStorage.getItem('number'));
  if (number > 0) {
    window.location.href = '/Home';
  } else {
    if (isMobile) {
      return (
        <main className={styles.main}>
          <div className={styles.content}>
            <RightScreen />
            <h3 className={styles.MainText}>Olá,</h3>
            <h4 className={styles.SubText}>
              Para continuar navegando de forma segura, efetue o login na rede.
            </h4>
            <Form />
          </div>
        </main>
      );
    }
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <h3 className={styles.MainText}>Olá,</h3>
          <h4 className={styles.SubText}>
            Para continuar navegando de forma segura, efetue o login na rede.
          </h4>
          <Form />
        </div>
        <RightScreen />
      </main>
    );
  }
}
