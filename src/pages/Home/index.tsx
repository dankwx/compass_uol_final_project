import styles from './Home.module.scss';
import Header from './Header';
import { signOut } from 'firebase/auth';
import { ReactComponent as Divider } from './line.svg';
import { useEffect, useState } from 'react';
import { auth } from 'firebase-config';
export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loggedUser, setloggedUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedUser(user.email);
      } else {
        setloggedUser(null);
        window.location.href = '/';
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const number = localStorage.getItem('number');
      if (number) {
        localStorage.setItem('number', (Number(number) - 1).toString());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [seconds, setSeconds] = useState<number>(
    Number(localStorage.getItem('number'))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Number(localStorage.getItem('number')));
      setSeconds((seconds) => seconds - 1);
      if (seconds === 0 || seconds < 0) {
        logout();
        setSeconds(0);
        window.location.href = '/';
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  function goToLogin() {
    window.location.href = '/';
  }

  if (loggedUser === null) {
    return null;
  } else {
    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.texts}>
            <h2 className={styles.firstBigText}>Our mission is</h2>
            <h3 className={styles.smallText}>Nossa missão é</h3>
            <h2 className={styles.bigText}>to transform the world</h2>
            <h3 className={styles.smallText}>transformar o mundo</h3>
            <h2 className={styles.bigText}>building digital experiences</h2>
            <h3 className={styles.smallText}>
              construindo experiências digitais
            </h3>
            <h2 className={styles.bigText}>that enable our client’s growth</h2>
            <h3 className={styles.smallText}>
              que permitam o crescimento dos nossos clientes
            </h3>
          </div>
          <div className={styles.footer}>
            <h3 className={styles.footerDesc}>
              Essa janela do navegador é usada para manter sua sessão de
              autenticação ativa. Deixe-a aberta em segundo plano e abra uma
              nova janela para continuar a navegar.
            </h3>
            <Divider height={85} />
            <h3 className={styles.refreshDesc}>Application refresh in</h3>
            <div className={styles.timerSeconds}>
              <h2 className={styles.bigNumber}>{seconds}</h2>
              <h3 className={styles.secondsDesc}>seconds</h3>
            </div>
            <div className={styles.btnsArea}>
              <div
                className={styles.continueBtn}
                onClick={() => {
                  window.open('https://www.google.com.br', '_blank');
                }}
              >
                <h3>Continuar Navegando</h3>
              </div>
              <div
                className={styles.logoutBtn}
                onClick={() => {
                  localStorage.setItem('number', Number(0).toString());
                  logout();
                  goToLogin();
                }}
              >
                <h3>Logout</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
