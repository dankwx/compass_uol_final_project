import styles from './Home.module.scss';
import Header from './Header';
import { signOut } from 'firebase/auth';
import { ReactComponent as Divider } from './line.svg';
import { useEffect, useState } from 'react';
import { auth } from 'firebase-config';
import { getSourceMapRange } from 'typescript';
import { doesNotMatch } from 'assert';
export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loggedUser, setloggedUser] = useState<any | null>(null);

  const [tabVisibility, setTabVisibility] = useState<boolean>(false);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('switched tab');
        setTabVisibility(false);
      } else {
        setTabVisibility(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedUser(user.email);
        setTabVisibility(true);
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
      if (tabVisibility === true) {
        if (number) {
          localStorage.setItem('number', (Number(number) - 1).toString());
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

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

  // a function that if clicked, redirect the screen to top
  const goToTop = () => {
    document.body.scrollTop = 0;
  };

  // every 1 second, console log the value of the scroll of the page
  const [scroll, setScroll] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(document.body.scrollTop);
      // console.log(scroll);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // if scrollTop value is greater than 150, console log middle
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.body.scrollTop > 150) {
        console.log('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  // create a const 'botton' that if the value of scrollTop is greater than 150, it will return true
  const bottom = () => {
    if (document.body.scrollTop > 295) {
      //29
      setIsBottom(false);

      return true;
    } else {
      setIsBottom(true);
      return false;
    }
  };

  // evey 1 second, bottom() will be called
  useEffect(() => {
    const interval = setInterval(() => {
      bottom();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // if the scroll is greater than 136, alert 'middle'
  // useEffect(() => {
  //   if (document.body.scrollTop > 260) {
  //     console.log('middle');
  //     setBottom(true);
  //   } else {
  //     setBottom(false);
  //   }
  // }, []);

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
            <div className={styles.refreshArea}>
              <h3 className={styles.refreshDesc}>Application refresh in</h3>
              <div className={styles.timerSeconds}>
                <h2 className={styles.bigNumber}>{seconds}</h2>
                <h3 className={styles.secondsDesc}>seconds</h3>
              </div>
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
            {isBottom && (
              <div className={styles.stickyFooter}>
                <h3 className={styles.refreshDesc}>Application refresh in</h3>
                <div className={styles.timerSeconds}>
                  <h2 className={styles.bigNumber}>{seconds}</h2>
                  <h3 className={styles.secondsDesc}>seconds</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
