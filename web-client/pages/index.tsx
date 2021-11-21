import { NextPage } from "next";
import styles from "../styles/Home.module.css";
const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__chat}>
        <h1>chat</h1>
      </div>
    </div>
  );
};
export default Home;
