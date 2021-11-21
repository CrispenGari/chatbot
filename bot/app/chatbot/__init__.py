# Imports
from torch import nn
import torch
from torch.nn import functional as F
import json, os 
import spacy


# variables
nlp = spacy.load('en_core_web_sm')
base_path = ""
model_path = os.path.join(os.getcwd(), "chatbot/files/model/chatbot.pt")
device = torch.device("cpu")
PAD_TOKEN = "<pad>"
UNK_TOKEN = "<unk>"

# loading the json files (vocabulary)
with open (os.path.join(
    os.getcwd(), 'chatbot/files/static/intents_vocab.json'
)) as f:
    LABEL = json.load(f)

with open (os.path.join(
    os.getcwd(), 'chatbot/files/static/words_vocab.json'
)) as f:
    TEXT = json.load(f)

# Creating the chatbot model (module)
class ChatBot(nn.Module):
  def __init__(self,
               vocab_size,
               embedding_size,
               output_dim,
               pad_index,
               dropout=.5
               ):
    super(ChatBot, self).__init__()
    self.embedding = nn.Embedding(
        vocab_size,
        embedding_size,
        padding_idx = pad_index
    )
    self.out = nn.Linear(
        embedding_size,
        out_features = output_dim
    )
  def forward(self, text):
    embedded = self.embedding(text).permute(1 ,0, 2)
    pooled = F.avg_pool2d(embedded,(embedded.shape[1], 1)
                          ).squeeze(1)
    return self.out(pooled)

# model variables
INPUT_DIM = len(TEXT)
EMBEDDING_DIM = 100
OUTPUT_DIM =  len(LABEL)
PAD_IDX = TEXT.get(PAD_TOKEN)

# model first instance
chatbot_model = None

# labels mapping
labels = {v:k for k,v in LABEL.items()}

# tokenizer function (sentences into tokens of word)
def tokenize_sent(sent):
  return [tok.text for tok in nlp.tokenizer(sent)]

# the predict function (for intent prediction)
def predict_intent(model, sent):
  model.eval()
  sent = sent.lower()
  with torch.no_grad():
    tokenized = tokenize_sent(sent)
    indexed = [TEXT.get(t) if TEXT.get(t) is not None else TEXT.get(UNK_TOKEN) for t in tokenized]
    tensor = torch.LongTensor(indexed)
    tensor = tensor.unsqueeze(1)
    probabilities = torch.softmax(model(tensor), dim=1)
    prediction = torch.argmax(probabilities, dim=1)
    item = prediction.item()
    probs = probabilities.squeeze(0)
    return {
        "label": item,
        "intent": labels[item],
        "probability": round(probs[item].item(), 2),
        "meta":{
          "programmer":"@crispengari",
          "project": "chatbot",
          "main": "artificial intelligence (nlp)"
      }
    }

print("loading chatbot...")
chatbot_model = ChatBot(
        INPUT_DIM,
        EMBEDDING_DIM,
        OUTPUT_DIM,
        pad_index= PAD_IDX
)
chatbot_model.load_state_dict(torch.load(model_path, map_location=device))
print("loading chatbot done")