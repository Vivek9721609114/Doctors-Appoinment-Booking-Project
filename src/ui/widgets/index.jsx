import React from "react";
import styles from "./index.module.css";
import { CiSearch } from "react-icons/ci";

const InputField = ({ type, icon, placeholder }) => {
  return (
    <div className={styles.search_bar}>
      <div className={styles.menu_search}>
        <form action="">
          <div>
            <input type="text" name="" id="" />
            <input type="submit" value="" />
          </div>
          <CiSearch />
        </form>
      </div>
    </div>
  );
};

export default InputField;
