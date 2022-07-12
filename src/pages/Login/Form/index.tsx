import styles from "./Form.module.scss";
import user from "./user-vector.png";
import password from "./password-vector.png";

export default function Form() {
  return (
    <main>
      <div className={styles.content}>
        <h3 className={styles.loginTitle}>Login</h3>
        <div className={styles.inputArea}>
          <input
            className={styles.inputUser}
            type="text"
            name="user"
            placeholder="Usuário"
          />
          <img src={user} alt="Icone do usuario" />
        </div>

        <div className={styles.inputArea}>
          <input
            className={styles.inputPassword}
            type="password"
            name="password"
            placeholder="Senha"
          />
          <img src={password} alt="Icone de senha" />
        </div>
        <div className={styles.errorArea}>
          <span className={styles.errorMessage}>
            Ops, usuário ou senha inválidos.
            <br />
            Tente novamente!
          </span>
        </div>

        <button className={styles.button}>Continuar</button>
      </div>
    </main>
  );
}
