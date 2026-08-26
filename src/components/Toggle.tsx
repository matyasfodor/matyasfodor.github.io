import { useIsMounted } from "../hooks/useIsMounted";
import styles from "./Toggle.module.scss";

const Toggle = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) => {
  const { isMounted } = useIsMounted();
  return (
    <div className={styles.Toggle}>
      <div
        className={`${styles.label} ${
          isMounted && !value ? styles.active : ""
        }`}
      >
        🌞
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          aria-label="Use dark theme"
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <div
        className={`${styles.label} ${isMounted && value ? styles.active : ""}`}
      >
        🌝
      </div>
    </div>
  );
};

export default Toggle;
