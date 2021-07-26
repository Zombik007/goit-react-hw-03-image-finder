import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
