import React, { useState } from 'react';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';

export default function Form() {
  function goToHome() {
    if (name == 'daniel@email.com') {
      setHide(true);
    } else {
      window.location.href = '/Home';
    }
  }

  const [name, setName] = useState('');
  const [hide, setHide] = useState(false);
  const [paswrdIcoPosition, setPaswrdIcoPosition] = useState(true);
  const [userIcoPosition, setUserIcoPosition] = useState(true);

  return (
    <main>
      <div className={styles.content}>
        <h3 className={styles.loginTitle}>Login</h3>
        <div className={styles.inputArea}>
          <input
            className={styles.inputUser}
            type='text'
            name='user'
            placeholder='Usuário'
            value={name}
            onChange={(event) => setName(event.target.value)}
            onClick={() => setUserIcoPosition(!paswrdIcoPosition)}
          />
          <img
            className={userIcoPosition ? styles.userIco : styles.userIcoHide}
            src={user}
            alt='Icone do usuario'
          />
        </div>

        <div className={styles.inputArea}>
          <input
            className={styles.inputPassword}
            type='password'
            name='password'
            placeholder='Senha'
            onClick={() => setPaswrdIcoPosition(!paswrdIcoPosition)}
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
