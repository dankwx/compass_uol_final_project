import styles from './Login.module.scss';
import Form from './Form';
import Botao from './RightScreen';

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h3 className={styles.MainText}>Olá,</h3>
        <h4 className={styles.SubText}>
          Para continuar navegando de forma segura, efetue o login na rede.
        </h4>
        <Form />
      </div>
      <Botao />
    </main>
  );
}
