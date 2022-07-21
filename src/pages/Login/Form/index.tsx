import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { signOut } from 'firebase/auth';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';

export default function Form() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem('number', Number(60).toString());
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
                <br />
                Tente novamente!
              </span>
            )}
          </div>
        </div>

        <button
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(event) => {
            logout();
            login();
          }}
          className={styles.button}
        >
          Continuar
        </button>
        <span className={styles.loginRedirect}>
          Não possui uma conta? <br />
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
