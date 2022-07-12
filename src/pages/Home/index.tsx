import styles from "./Home.module.scss";
import Header from "./Header";
import { ReactComponent as Divider } from "./line.svg";
export default function Home() {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.texts}>
          <h2 className={styles.firstBigText}>Our mission is</h2>
          <h3 className={styles.smallText}>Nossa missão é</h3>
          <h2 className={styles.bigText}>to transform the world</h2>
          <h3 className={styles.smallText}>transformar o mundo</h3>
          <h2 className={styles.bigText}>building digital experiences</h2>
          <h3 className={styles.smallText}>
            construindo experiências digitais
          </h3>
          <h2 className={styles.bigText}>that enable our client’s growth</h2>
          <h3 className={styles.smallText}>
            que permitam o crescimento dos nossos clientes
          </h3>
        </div>
        <div className={styles.footer}>
          <h3 className={styles.footerDesc}>
            Essa janela do navegador é usada para manter sua sessão de
            autenticação ativa. Deixe-a aberta em segundo plano e abra uma nova
            janela para continuar a navegar.
          </h3>
          <Divider height={85} />
          <h3 className={styles.refreshDesc}>Application refresh in</h3>
          <div className={styles.timerSeconds}>
            <h2 className={styles.bigNumber}>600</h2>
            <h3 className={styles.secondsDesc}>seconds</h3>
          </div>
          <div className={styles.btnsArea}>
            <div className={styles.continueBtn}>
              <h3>Continuar Navegando</h3>
            </div>
            <div className={styles.logoutBtn}>
              <h3>Logout</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
