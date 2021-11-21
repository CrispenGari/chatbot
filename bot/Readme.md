### Bot

This is a backend AI server for our chatbot.

### Installation of required packages

To install required packages you will need to run the following command:

```shell
pip install -r requirements.txt
```

### packages versions

1. torch version == `1.10.0`
2. Flask version == `2.0.2`
3. Flask-GraphQL version == `2.0.1`
4. spacy version == `3.2.0`

### Consuming the API

This is a simple API server that contains one graphene mutation and we can send the following mutation to the server:

```
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

```

With the following query variables

```json
{
  "input": {
    "text": "hi"
  }
}
```

To get the following response

```json
{
  "data": {
    "getResponse": {
      "res": {
        "question": {
          "text": "hi"
        },
        "answer": {
          "response": "Hi human, please tell me your GeniSys user"
        },
        "classification": {
          "probability": 1,
          "intent": "greeting",
          "label": 5
        },
        "meta": {
          "programmer": "@crispengari",
          "project": "chatbot",
          "main": "artificial intelligence (nlp)"
        }
      }
    }
  }
}
```

### Chatbot model metrics

The following table show the `chatbot` model metrics that we obtained during training and evaluation.

<table border="1">
    <thead>
      <tr>
        <th>model name</th>
        <th>model description</th>
        <th>test accuracy</th>
        <th>validation accuracy</th>
        <th>train accuracy</th>
         <th>test loss</th>
        <th>validation loss</th>
        <th>train loss</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>chatbot-model</td>
        <td>classification of intents by a chatbot.</td>
        <td>100.00%</td>
        <td>100.00%</td>
        <td>100.00%</td>
        <td>0.022</td>
        <td>0.161</td>
        <td>0.293</td>
      </tr>
       </tbody>
  </table>

### Notebooks

If you want to access the notebooks that I used for training the chatbot model and data preparation you can find them [here](https://github.com/CrispenGari/nlp-pytorch/tree/main/08_Simple_Chatbot).
