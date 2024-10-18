from flask import Flask
from config.config import Config
from services.database import db, inicializar_banco
from routes.livros import livros_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/livros/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})
app.config.from_object(Config)

# Inicializa o banco de dados
db.init_app(app)

# Registra as rotas (blueprint)
app.register_blueprint(livros_blueprint, url_prefix='/livros')

if __name__ == '__main__':
    inicializar_banco(app)
    app.run(port=5000, host='localhost', debug=True)
