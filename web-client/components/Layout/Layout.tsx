import React from "react";
import NextHead from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <NextHead>
        <meta charSet="UTF-8" lang="eng" />
        <title>Layout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </NextHead>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
