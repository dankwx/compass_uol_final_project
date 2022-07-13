import React, { useState } from 'react';
import styles from './Form.module.scss';
import user from './user-vector.png';
import password from './password-vector.png';

export default function Form() {
  function teste() {
    if (name == 'daniel') {
      setHide(true);
    } else {
      alert('Passou!');
    }
  }

  const routes = [
    {
      label: 'Home',
      to: '/Login',
    },
    {
      label: 'Home',
      to: '/Home',
    },
  ];

  function goToHome() {
    if (name == 'daniel') {
      setHide(true);
    } else {
      window.location.href = '/Home';
    }
  }

  const [name, setName] = useState('');
  const [hide, setHide] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);

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
            onClick={() => setIsVisible2(!isVisible)}
          />
          <img
            className={isVisible2 ? styles.userIco : styles.userIcoHide}
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
            onClick={() => setIsVisible(!isVisible)}
          />
          <img
            className={isVisible ? styles.passwordIco : styles.passwordIcoHide}
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
