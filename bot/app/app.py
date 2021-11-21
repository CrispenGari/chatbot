from api import app
from flask_graphql import GraphQLView
from schema import schema

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,
))

if __name__ == '__main__':
    app.run(port=3001, debug=False)