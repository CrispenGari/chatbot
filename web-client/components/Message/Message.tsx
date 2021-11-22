import React from "react";
import { MessageType } from "../../pages";
import styles from "./Message.module.css";
const Message: React.FC<MessageType> = ({ message, user, time }) => {
  return (
    <div className={user !== "frank" ? styles.message : styles.message__bot}>
      <div className={styles.message__text}>{message}</div>
      <p>
        <span>{user}</span>
        <span>{time}</span>
      </p>
    </div>
  );
};

export default Message;
