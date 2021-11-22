import { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useChatBotResponseMutation } from "../src/generated/graphql";
import Message from "../components/Message/Message";

export interface MessageType {
  user: string;
  message: string;
  time: string;
}
const Home: NextPage = () => {
  const [question, setQuestion] = React.useState("");
  const [askQn, { loading }] = useChatBotResponseMutation();
  const [messages, setMessages] = React.useState<MessageType[]>([]);

  const askQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question) return;
    setMessages((prev) => [
      ...prev,
      {
        message: question,
        user: "you",
        time: `${
          String(new Date().getHours()).length < 2
            ? "0" + new Date().getHours().toString()
            : new Date().getHours()
        }:${
          String(new Date().getMinutes()).length < 2
            ? "0" + new Date().getMinutes().toString()
            : new Date().getMinutes()
        }`,
      },
    ]);
    const { data } = await askQn({
      variables: {
        input: {
          text: question,
        },
      },
    });
    if (data) {
      setMessages((prev) => [
        ...prev,
        {
          message: data?.getResponse?.res.answer.response,
          user: "frank",
          time: `${
            String(new Date().getHours()).length < 2
              ? "0" + new Date().getHours().toString()
              : new Date().getHours()
          }:${
            String(new Date().getMinutes()).length < 2
              ? "0" + new Date().getMinutes().toString()
              : new Date().getMinutes()
          }`,
        },
      ]);
    }
    setQuestion("");
    window.document.querySelector("form").scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.home}>
      <div className={styles.home__chat}>
        <h1>chat with frank</h1>
        <div className={styles.home__chat__messages}>
          {messages.map((message, index) => {
            return (
              <Message
                time={message.time}
                message={message.message}
                user={message.user}
                key={index.toString()}
              />
            );
          })}
        </div>
        <form onSubmit={askQuestion}>
          <textarea
            placeholder="type a message"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>

          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};
export default Home;
