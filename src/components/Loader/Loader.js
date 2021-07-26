import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader__ellips}>
      <span className={styles.loader__ellips__dot}></span>
      <span className={styles.loader__ellips__dot}></span>
      <span className={styles.loader__ellips__dot}></span>
      <span className={styles.loader__ellips__dot}></span>
    </div>
  );
};

export default Loader;
