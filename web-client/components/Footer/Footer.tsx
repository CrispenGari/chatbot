import React from "react";
import styles from "./Footer.module.css";
const Footer: React.FC<{}> = () => {
  return (
    <div className={styles.footer}>
      <p>an ai chat bot built using deep learning in python.</p>
    </div>
  );
};

export default Footer;
