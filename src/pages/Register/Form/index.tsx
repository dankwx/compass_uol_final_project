import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';
import checkIco from './check-vector.png';
import errorIco from './error-vector.png';
import { FirebaseError } from 'firebase/app';

export default function Form() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState('1');

  // várias etapas de verificação para o cadastro do usuário, com verificação de email e senha
  // several steps of verification for the user registration, with email and password verification
  const register = async () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        registerEmail
      ) ||
      registerPassword.length < 6 ||
      !/^(?=.*[0-9])/.test(registerPassword) ||
      !/^(?=.*[A-Z])/.test(registerPassword) ||
      !/^(?=.*[a-z])/.test(registerPassword)
    ) {
      if (
        registerPassword.length < 6 ||
        !/^(?=.*[0-9])/.test(registerPassword) ||
        !/^(?=.*[A-Z])/.test(registerPassword) ||
        !/^(?=.*[a-z])/.test(registerPassword)
      ) {
        setPaswrdError(true);
      } else {
        setPaswrdError(false);
      }
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          registerEmail
        )
      ) {
        setUserError(true);
      } else {
        setUserError(false);
      }

      setInvalidPassword('2');
      setHide(true);
      try {
        setEmailHide(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          invalidPassword
        );
      } catch (error) {
        // console.log(error);
      }
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        localStorage.setItem('number', Number(60).toString());
        goToHome();
      } catch (error) {
        if (error instanceof FirebaseError) {
          setEmailHide(true);
          setUserError(true);
        } else {
          return null;
        }
      }
    }
  };

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
  const [emailHide, setEmailHide] = useState(false);

  // função que é chamada acima para complementar o register()
  // function that is called above to complement register()
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

  // todas funções abaixo servem para tratar o css do input, se é valido ou não
  // all functions below serve to treat the css of the input, if it is valid or not
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
        <div className={styles.emailUsedError}>
          {emailHide && (
            <span className={styles.emailUsedStyle}>
              Este Email já está em uso.
            </span>
          )}
        </div>
        )
        <div className={styles.inputArea}>
          <input
            className={userError ? styles.inputUserError : styles.inputUser}
            type='text'
            name='user'
            placeholder='Usuário'
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setRegisterEmail(event.target.value);
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
              setRegisterPassword(event.target.value);
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
        <button
          onClick={() => {
            register();
          }}
          className={styles.button}
        >
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
