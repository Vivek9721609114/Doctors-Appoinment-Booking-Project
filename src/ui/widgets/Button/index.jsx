import React from "react";
import styles from "./index.module.css";
const Button = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className={styles.button}>
      <button>{name}</button>
    </div>
  );
};

export default Button;
