from graphene import Float, ObjectType, String, Schema, InputObjectType, Mutation, Field, Int
from chatbot import predict_intent, chatbot_model
import os, json, random


with open (os.path.join(
    os.getcwd(), 'chatbot/files/static/Intent.json'
)) as f:
    data = json.load(f)
    
intents = data["intents"]

class UserInput(InputObjectType):
    text = String(required=True)

class MetaType(ObjectType):
    programmer = String(required=True)
    project = String(required=True)
    main = String(required=True)

class ClassificationType(ObjectType):
    label = Int(required=True)
    intent = String(required=True)
    probability = Float(required=True)
    
class BotAnswer(ObjectType):
    response = String(required=True)
    
class UserQuestion(ObjectType):
    text =  String(required=True)
    
class BotResponse(ObjectType):
    classification = Field(ClassificationType, required=True)
    meta = Field(MetaType, required=True)
    answer = Field(BotAnswer, required=True)
    question = Field(UserQuestion, required=True)
    

class RespondBot(Mutation):
    class Arguments:
        input = UserInput(required=True)

    res = Field(lambda: BotResponse)
    def mutate(root, args, input):
        # make predictions
        pred = predict_intent(model=chatbot_model, sent=input["text"])
        classification = ClassificationType(
            label = pred.get("label"),
            intent = pred.get("intent"),
            probability=pred.get("probability"),
        )
        meta = MetaType(
            programmer=pred.get("meta").get("programmer"),
            project=pred.get("meta").get("project"),
            main=pred.get("meta").get("main"),
        )
        question = UserQuestion(
            text = input["text"]
        )
        
        resp = list(filter(
            lambda x: x["intent"].lower() == pred.get("intent"),
            intents))[0]
        responses = resp.get('responses')   
        answer = BotAnswer(
            response = random.choice(responses)
        )
        res = BotResponse(
                classification=classification,
                meta = meta,
                question = question,
                answer = answer
        )
        return RespondBot(res)
    
class Mutation(ObjectType):
    get_response = RespondBot.Field()
    
class Query(ObjectType):
    hello = String(required=True)
    
    def resolve_hello(root, args):
        return "hello world"

schema = Schema(mutation=Mutation, query=Query)