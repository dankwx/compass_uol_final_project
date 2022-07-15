import React, { useState } from 'react';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';

export default function Form() {
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
            onChange={(event) => setPaswrd(event.target.value)}
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

        <button onClick={goToHome} className={styles.button}>
          Continuar
        </button>
      </div>
    </main>
  );
}
