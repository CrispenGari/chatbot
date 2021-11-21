import { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useChatBotResponseMutation } from "../src/generated/graphql";
import { useMutation, gql } from "@apollo/client";
const Home: NextPage = () => {
  const [question, setQuestion] = React.useState("");
  // const [askQn, { loading, data }] = useChatBotResponseMutation();

  const [messages, setMessages] = React.useState([]);

  const [askQn, { loading, data }] = useMutation(gql`
    mutation ChatBotResponse($input: UserInput!) {
      getResponse(input: $input) {
        res {
          question {
            text
          }
          answer {
            response
          }
          classification {
            probability
            intent
            label
          }
          meta {
            programmer
            project
            main
          }
        }
      }
    }
  `);
  const askQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question) return;
    await askQn({
      variables: {
        input: {
          text: question,
        },
      },
    });
  };

  console.log(data, loading);

  React.useEffect(() => {
    (async () => {
      await fetch("http://127.0.0.1:3001/hello")
        .then((res) => res.json())
        .then((d) => console.log(d))
        .catch((e) => console.log(e));
    })();
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.home__chat}>
        <h1>chat with frank</h1>
        <div className={styles.home__chat__messages}>messages</div>

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
