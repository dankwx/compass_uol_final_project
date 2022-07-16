import React, { useState } from 'react';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';
import checkIco from './check-vector.png';
import errorIco from './error-vector.png';

export default function Form() {
  const [name, setName] = useState('');
  const [paswrd, setPaswrd] = useState('');
  const [hide, setHide] = useState(false);
  const [paswrdIcoPosition, setPaswrdIcoPosition] = useState(true);
  const [userIcoPosition, setUserIcoPosition] = useState(true);
  const [userError, setUserError] = useState(false);
  const [paswrdError, setPaswrdError] = useState(false);
  const [passwrdLenght, setPasswrdLenght] = useState(false);
  const [passwrdLowerCase, setPasswrdLowerCase] = useState(false);
  const [passwrdUpperCase, setPasswrdUpperCase] = useState(false);
  const [passwrdNumeric, setPasswrdNumeric] = useState(false);

  function goToHome() {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        name
      ) == false ||
      passwrdLenght == false ||
      passwrdLowerCase == false ||
      passwrdUpperCase == false ||
      passwrdNumeric == false
    ) {
      setHide(true);
      setUserError(true);
      setPaswrdError(true);
    } else {
      window.location.href = '/Home';
    }
  }

  function onFocusPassword() {
    setPaswrdIcoPosition(false);
    setHide(true);
  }

  function checkPasswordLength() {
    if (paswrd.length < 6) {
      setPasswrdLenght(false);
    } else {
      setPasswrdLenght(true);
    }
  }

  function checkPasswordLowerCase() {
    if (/[a-z]/.test(paswrd)) {
      setPasswrdLowerCase(true);
    } else {
      setPasswrdLowerCase(false);
    }
  }

  function checkPasswordUpperCase() {
    if (/[A-Z]/.test(paswrd)) {
      setPasswrdUpperCase(true);
    } else {
      setPasswrdUpperCase(false);
    }
  }

  function checkPasswordNumeric() {
    if (/[0-9]/.test(paswrd)) {
      setPasswrdNumeric(true);
    } else {
      setPasswrdNumeric(false);
    }
  }

  return (
    <main>
      <div className={styles.content}>
        <h3 className={styles.loginTitle}>Cadastro</h3>
        <div className={styles.inputArea}>
          <input
            className={userError ? styles.inputUserError : styles.inputUser}
            type='text'
            name='user'
            placeholder='Usuário'
            value={name}
            onChange={(event) => setName(event.target.value)}
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
              checkPasswordLength();
            }}
            onKeyUp={() => {
              checkPasswordLength();
              checkPasswordLowerCase();
              checkPasswordUpperCase();
              checkPasswordNumeric();
            }}
            onKeyDown={() => checkPasswordLength()}
            onFocus={onFocusPassword}
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
          {hide && (
            <div className={styles.errorArea}>
              <div className={styles.lenghtErrorArea}>
                <img
                  className={styles.icoErrorLenght}
                  src={passwrdLenght ? checkIco : errorIco}
                  alt='icoErrorLenght'
                />
                <span className={styles.errorLenght}>
                  No mínimo 6 caracteres <br />
                </span>
              </div>
              <div className={styles.lowerCaseArea}>
                <img
                  className={styles.icoErrorLenght}
                  src={passwrdLowerCase ? checkIco : errorIco}
                  alt='icoErrorLenght'
                />
                <span className={styles.errorLowerCase}>
                  1 Letra minúscula <br />
                </span>
              </div>
              <div className={styles.upperCaseArea}>
                <img
                  className={styles.icoErrorLenght}
                  src={passwrdUpperCase ? checkIco : errorIco}
                  alt='icoErrorLenght'
                />
                <span className={styles.errorUpperCase}>
                  1 Letra maiúscula <br />
                </span>
              </div>
              <div className={styles.numberArea}>
                <img
                  className={styles.icoErrorLenght}
                  src={passwrdNumeric ? checkIco : errorIco}
                  alt='icoErrorLenght'
                />
                <span className={styles.errorNumber}>1 Número</span>
              </div>
            </div>
          )}
        </div>

        <button onClick={goToHome} className={styles.button}>
          Continuar
        </button>
        <span className={styles.loginRedirect}>
          Já possui uma conta?{' '}
          <span
            className={styles.link}
            onClick={() => (window.location.href = '/')}
          >
            Efetue o Login
          </span>
        </span>
      </div>
    </main>
  );
}
