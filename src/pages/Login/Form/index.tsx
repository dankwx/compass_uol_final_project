import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { signOut } from 'firebase/auth';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';

export default function Form() {
  const [width, setWidth] = useState(window.innerWidth);
  // este useEffect irá pegar o tamanho da tela
  // this useEffect will get the screen size
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  // se o valor do tamanho de tela for menor que 768px, então o usuário está em um dispositivo móvel
  // if the screen size is less than 768px, then the user is on a mobile device

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  // se o valor do tamanho de tela for menor que 1024px, então o usuário está em um dispositivo tablet
  // if the screen size is less than 1024px, then the user is on a tablet
  useEffect(() => {
    if (width < 1024 && width > 507) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  }, [width]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // se os dados informados forem válidos, então o usuário será logado e receber um token de 60 segundos, e irá para página Home
  // if the data is valid, then the user will be logged in and will receive a token of 60 seconds, and will go to Home page
  const login = async () => {
    logout();
    try {
      logout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem('number', Number(60).toString());
      // refrsh page
      window.location.reload();
      goToHome();
    } catch (error) {
      setUserError(true);
      setPaswrdError(true);
      console.log('(400) Error logging in');
      setHide(true);
    }
  };

  const [name, setName] = useState('');
  const [paswrd, setPaswrd] = useState('');
  const [hide, setHide] = useState(false);
  const [paswrdIcoPosition, setPaswrdIcoPosition] = useState(true);
  const [userIcoPosition, setUserIcoPosition] = useState(true);
  const [userError, setUserError] = useState(false);
  const [paswrdError, setPaswrdError] = useState(false);

  // função que foi chamada no login(), com suas verificações
  // function that was called in login(), with its verifications
  function goToHome() {
    if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(name) ||
      paswrd.length < 3
    ) {
      setHide(true);
      setUserError(true);
      setPaswrdError(true);
    } else {
      window.location.href = '/Home';
    }
  }

  // logout do usuário pelo firebase
  // logout of the user by firebase
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <main>
      <div className={styles.content}>
        <h3 className={styles.loginTitle}>Login</h3>
        <div className={styles.inputArea}>
          <input
            className={userError ? styles.inputUserError : styles.inputUser}
            type='text'
            name='user'
            placeholder='Usuário'
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setLoginEmail(event.target.value);
            }}
            onFocus={() => setUserIcoPosition(false)}
          />
          <img
            className={userIcoPosition ? styles.userIco : styles.userIcoHide}
            src={user}
            alt='Icone do usuario'
          />
        </div>

        <div className={styles.inputArea}>
          <input
            className={
              paswrdError ? styles.inputPasswordError : styles.inputPassword
            }
            type='password'
            name='password'
            placeholder='Senha'
            value={paswrd}
            onChange={(event) => {
              setPaswrd(event.target.value);
              setLoginPassword(event.target.value);
            }}
            onFocus={() => setPaswrdIcoPosition(false)}
          />
          <img
            className={
              paswrdIcoPosition ? styles.passwordIco : styles.passwordIcoHide
            }
            src={password}
            alt='Icone de senha'
          />
        </div>
        <div className={styles.errorBox}>
          <div className={styles.errorArea}>
            {hide && (
              <span className={styles.errorMessage}>
                Ops, usuário ou senha inválidos.
                {isTablet ? null : <br />}
                Tente novamente!
              </span>
            )}
          </div>
        </div>

        <button
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(event) => {
            login();
          }}
          className={styles.button}
        >
          Continuar
        </button>
        <span className={styles.loginRedirect}>
          Não possui uma conta?{' '}
          {isMobile ? null : <br /> || isTablet ? null : <br />}
          <span
            className={styles.link}
            onClick={() => (window.location.href = '/Register')}
          >
            Efetue o Cadastro
          </span>
        </span>
      </div>
    </main>
  );
}
