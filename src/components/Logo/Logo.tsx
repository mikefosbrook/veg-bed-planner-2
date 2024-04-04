import styles from './Logo.module.scss';

export default function logo() {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img alt="Veg Planner" src="/veg-planner-logo.svg" />
      </a>
    </div>
  );
}
