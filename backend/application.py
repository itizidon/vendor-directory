import sys, os
sys.path.append(sys.path.append(os.path.dirname(__file__)))

from flask import Flask, render_template

from flask_graphql import GraphQLView
from lib.graphql.schema import schema

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
  return render_template(
    'index.html',
    js_url='//localhost:8080/main.bundle.js'
  )

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
  'graphql',
  schema=schema,
  graphiql=True,
))

if __name__ == '__main__':
  app.run()
