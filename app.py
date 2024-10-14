#Endpoints - 
    # - localhost/livros (GET) (obter todos os livros)
    # - localhost/livros (POST) (criar um novo livro)
    # - localhost/livros/id (GET) (obter um livro por id)
    # - localhost/livros/id (PUT) (alterar um livro por id)
    # - localhost/livros/id (DELETE) (excluir um livro por id)

'''Para criar api em python podemos usar o flask ou o jhango.
O jango é mais avançãdo, para essa api usaremos o flask'''

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from config.config import Config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Isso habilita o CORS para todas as rotas

app = Flask(__name__)
app.config.from_object(Config)  # Carrega as configurações do config.py

db = SQLAlchemy(app)

# Modelo de Livro
class Livro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    ano_publicacao = db.Column(db.Integer, nullable=False)

# Criar o banco de dados e as tabelas, e adicionar livros iniciais
def inicializar_banco():
    with app.app_context():
        db.create_all()  # Cria as tabelas novamente com o novo modelo
        #print("Tabelas criadas.")
        if Livro.query.count() == 0:
            #print("A tabela está vazia. Adicionando livros iniciais.")
            livros = [
                Livro(titulo='O Senhor dos Anéis', autor='J.R.R. Tolkien', ano_publicacao=1954),
                Livro(titulo='1984', autor='George Orwell', ano_publicacao=1949),
                Livro(titulo='Game of Thrones', autor='Autor', ano_publicacao=2005),
                Livro(titulo='Cinderela', autor='Charles Perrault', ano_publicacao=1697),
                Livro(titulo='Harry Potter', autor='J.K. Rowling', ano_publicacao=1997),
                Livro(titulo='O Alquimista', autor='Paulo Coelho', ano_publicacao=1988)
            ]
            db.session.bulk_save_objects(livros)
            db.session.commit()
            #print("Livros iniciais adicionados com sucesso.")

# Consultar todos os livros
@app.route('/livros', methods=['GET'])
def obter_livros():
    livros = Livro.query.all()
    resultado = [{'id': livro.id, 'titulo': livro.titulo, 'autor': livro.autor, 'ano_publicacao': livro.ano_publicacao} for livro in livros]
    return jsonify(resultado)

# Consultar livro por ID
@app.route('/livros/<int:livro_id>', methods=['GET'])
def obter_livro(livro_id):
    livro = Livro.query.get(livro_id)
    if livro:
        return jsonify({'id': livro.id, 'titulo': livro.titulo, 'autor': livro.autor, 'ano_publicacao': livro.ano_publicacao}), 200
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404

# Criar um novo livro
@app.route('/livros', methods=['POST'])
def criar_livro():
    dados = request.get_json()

    # Verifica se os dados são válidos
    if not dados or 'titulo' not in dados or 'autor' not in dados or 'ano_publicacao' not in dados:
        return jsonify({'erro': 'Dados inválidos'}), 400

    # Cria um novo livro
    try:
        novo_livro = Livro(
            titulo=dados['titulo'],
            autor=dados['autor'],
            ano_publicacao=dados['ano_publicacao']  # Inclui o ano de publicação
        )

        db.session.add(novo_livro)
        db.session.commit()

        return jsonify({
            'id': novo_livro.id,
            'titulo': novo_livro.titulo,
            'autor': novo_livro.autor,
            'ano_publicacao': novo_livro.ano_publicacao
        }), 201

    except Exception as e:
        db.session.rollback()  # Desfaz a operação em caso de erro
        return jsonify({'erro': str(e)}), 500

# Editar um livro por ID
@app.route('/livros/<int:livro_id>', methods=['PUT'])
def editar_livro(livro_id):
    livro = Livro.query.get(livro_id)

    if not livro:
        return jsonify({'erro': 'Livro não encontrado'}), 404

    dados = request.get_json()

    try:
        livro.titulo = dados.get('titulo', livro.titulo)
        livro.autor = dados.get('autor', livro.autor)
        livro.ano_publicacao = dados.get('ano_publicacao', livro.ano_publicacao)  # Atualiza o ano se fornecido
        db.session.commit()

        return jsonify({
            'id': livro.id,
            'titulo': livro.titulo,
            'autor': livro.autor,
            'ano_publicacao': livro.ano_publicacao
        }), 200

    except Exception as e:
        db.session.rollback()  # Desfaz a operação em caso de erro
        return jsonify({'erro': str(e)}), 500

# Excluir um livro por ID
@app.route('/livros/<int:livro_id>', methods=['DELETE'])
def excluir_livro(livro_id):
    livro = Livro.query.get(livro_id)

    if not livro:
        return jsonify({'erro': 'Livro não encontrado'}), 404

    try:
        db.session.delete(livro)
        db.session.commit()

        return jsonify({'message': 'Livro excluído com sucesso'}), 200

    except Exception as e:
        db.session.rollback()  # Desfaz a operação em caso de erro
        return jsonify({'erro': str(e)}), 500

# Executa o servidor Flask
if __name__ == '__main__':
    inicializar_banco()  # Chama a função para inicializar o banco de dados
    app.run(port=5000, host='localhost', debug=True)

