import styles from './Login.module.scss';
import Form from './Form';
import RightScreen from './RightScreen';
import { useEffect, useState } from 'react';

export default function Login() {
  // este useEffect irá pegar o tamanho da tela
  // this useEffect will get the screen size
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  // se o valor do tamanho de tela for menor que 768px, então o usuário está em um dispositivo móvel
  // if the screen size is less than 768px, then the user is on a mobile device
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
