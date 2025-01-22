import React from "react";
import styles from "./index.module.css";
const InputField = ({ type, placeholder, onChange, id }) => {
  return (
    <div className={styles.input}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

export default InputField;
