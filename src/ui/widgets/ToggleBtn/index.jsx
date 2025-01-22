import React from "react";
import styles from "./index.module.css";
const ToggleBtn = ({ name, onClick }) => {
  return (
    <>
      <div onClick={onClick} className={styles.button}>
        <button>{name}</button>
      </div>
    </>
  );
};

export default ToggleBtn;
