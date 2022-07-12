import styles from "./Temperature.module.scss";
import { ReactComponent as Cloud } from "./cloud-ico.svg";

export default function Temperature() {
  return (
    <div className={styles.content}>
      <h3 className={styles.city}>Passo Fundo - RS</h3>

      <div className={styles.temperature}>
        <Cloud width={60} height={35} />
        <h2 className={styles.cityTemp}>22º</h2>
      </div>
    </div>
  );
}
