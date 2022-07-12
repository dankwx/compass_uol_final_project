import styles from "./Header.module.scss";
import { ReactComponent as Logo } from "../Header/secondary-logo-compass.svg";
import Time from "./Time";
import Temperature from "./Temperature";

export default function Header() {
  return (
    <div className={styles.content}>
      <div className={styles.logoArea}>
        <Logo />
      </div>
      <Time />
      <Temperature />
    </div>
  );
}
