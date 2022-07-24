import styles from './Home.module.scss';
import Header from './Header';
import { signOut } from 'firebase/auth';
import { ReactComponent as Divider } from './line.svg';
import { useEffect, useState } from 'react';
import { auth } from 'firebase-config';
export default function Home() {
  const [loggedUser, setloggedUser] = useState<unknown | null>(null);

  // este useEffect irá ser usado para verificar se o usuário está logado, se não estiver, ele irá redirecionar para a página de login
  // this useEffect will be used to check if the user is logged in or not, if not it will redirect to the login page
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

  // simples logout do usuário que é chamado quando o token chega a 0 segundos, ou quando clicamos no botão de logout
  // simple logout of the user that is called when the token reaches 0 seconds or when we click on the logout button
  const logout = async () => {
    await signOut(auth);
  };

  // este useEffect serve para verificar se o token de 60 segundos ainda não expirou, a cada segundo ele diminui 1 segundo
  // this useEffect will be used to check if the token has expired, every second it will decrease 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const number = localStorage.getItem('number');
      if (number) {
        localStorage.setItem('number', (Number(number) - 1).toString());
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const [seconds, setSeconds] = useState<number>(
    Number(localStorage.getItem('number'))
  );

  // este useEffect serve para verificar se o token chegou em 0 segundos, se sim, ele irá redirecionar para a página de login e tomar logout
  // this useEffect will be used to check if the token has expired, if it has, it will redirect to the login page and logout
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

  // este useEffect serve para verificar em que valor o scroll do usuario mobile está
  // this useEffect will be used to check what value the user mobile scroll is
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.body.scrollTop > 150) {
        console.log('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [isBottom, setIsBottom] = useState<boolean>(false);

  // esta constante bottom é responsável pela verificação se o usuário está no final da página, se sim, ele esconde o footer sticker
  // this constant bottom is responsible for checking if the user is at the bottom of the page, if so, it will hide the footer sticker
  const bottom = () => {
    if (document.body.scrollTop > 265) {
      setIsBottom(false);

      return true;
    } else {
      setIsBottom(true);
      return false;
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      bottom();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // este if é executado uma vez ao abrir a página, se o usuário estiver logado, ele permite que a página carregue, se não, a página não carrega
  // this if is executed once when the page is opened, if the user is logged in, it allows the page to load, if not, the page will not load
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
