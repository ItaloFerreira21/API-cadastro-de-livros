from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def inicializar_banco(app):
    with app.app_context():
        db.create_all()
        # Adicionar livros iniciais, se necessário
