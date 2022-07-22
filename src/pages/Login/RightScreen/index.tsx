import styles from './RightScreen.module.scss';
import { ReactComponent as Logo } from '../../../assets/logo-compass.svg';

export default function RightScreen() {
  return (
    <main>
      <div className={styles.content}>
        <Logo height={120} width={250} />
      </div>
    </main>
  );
}
