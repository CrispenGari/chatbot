from api import app
from flask_graphql import GraphQLView
from schema import schema
from flask_cors import cross_origin, CORS

CORS(app, resources={r"/graphql/*": {"origins": "*"}}, supports_credentials=True)
@app.route("/hello", methods=["GET"])
def hello():
    return {
       "hello": "hello world" 
    }, 200

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,
))

if __name__ == '__main__':
    app.run(port=3001, debug=True)