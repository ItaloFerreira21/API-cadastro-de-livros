import os

class Config:
    # Obtem o caminho do diretório base
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    
    # Configurações do banco de dados
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(BASEDIR, "..", "instance", "livros.db")}'  # Caminho absoluto para o banco de dados
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Outras configurações que você pode adicionar
    SECRET_KEY = os.getenv('SECRET_KEY', 'sua_chave_secreta')  # Para segurança



