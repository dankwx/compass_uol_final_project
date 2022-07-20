import styles from './Login.module.scss';
import Form from './Form';
import Botao from './RightScreen';

export default function Register() {
  const number = Number(localStorage.getItem('number'));
  if (number > 0) {
    window.location.href = '/Home';
  } else {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <h3 className={styles.MainText}>Olá,</h3>
          <h4 className={styles.SubText}>
            Para continuar navegando de forma segura, efetue o cadastro na rede.
          </h4>
          <Form />
        </div>
        <Botao />
      </main>
    );
  }
}
