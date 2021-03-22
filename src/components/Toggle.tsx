import styles from "./Toggle.module.scss";

const Toggle = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) => {
  return (
    <div className={styles.Toggle}>
      <div className={styles.label}>🌞</div>
      <label className={styles.switch}>
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <div className={styles.label}>🌒</div>
    </div>
  );
};

export default Toggle;
