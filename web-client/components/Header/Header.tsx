import React from "react";
import styles from "./Header.module.css";
const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <h1>chatbot</h1>
      </div>
      <div className={styles.header__right}>
        <h1>Frank bot</h1>
      </div>
    </div>
  );
};

export default Header;
