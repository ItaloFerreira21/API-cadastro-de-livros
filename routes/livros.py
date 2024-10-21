from flask import Blueprint, jsonify, request
from models.livro import Livro
from services.database import db

livros_blueprint = Blueprint('livros', __name__)

@livros_blueprint.route('/', methods=['GET'])
def obter_livros():
    livros = Livro.query.all()
    resultado = [{'id': livro.id, 'titulo': livro.titulo, 'autor': livro.autor, 'ano_publicacao': livro.ano_publicacao} for livro in livros]
    return jsonify(resultado)

@livros_blueprint.route('/<int:livro_id>', methods=['GET'])
def obter_livro(livro_id):
    livro = Livro.query.get(livro_id)
    if livro:
        return jsonify({'id': livro.id, 'titulo': livro.titulo, 'autor': livro.autor, 'ano_publicacao': livro.ano_publicacao}), 200
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404

@livros_blueprint.route('/', methods=['POST']) #Adiciona novo livro
def criar_livro():
    dados = request.get_json()
    if not dados or 'titulo' not in dados or 'autor' not in dados or 'ano_publicacao' not in dados:
        return jsonify({'erro': 'Dados inválidos'}), 400
    # Verifica se um livro com o mesmo título e autor já existe
    livro_existente = Livro.query.filter_by(titulo=dados['titulo'], autor=dados['autor']).first()
    if livro_existente:
        return jsonify({'erro': 'Livro já existe'}), 409
    try:
        novo_livro = Livro(titulo=dados['titulo'], autor=dados['autor'], ano_publicacao=dados['ano_publicacao'])
        db.session.add(novo_livro)
        db.session.commit()
        return jsonify({'id': novo_livro.id, 'titulo': novo_livro.titulo, 'autor': novo_livro.autor, 'ano_publicacao': novo_livro.ano_publicacao}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

@livros_blueprint.route('/<int:livro_id>', methods=['PUT'])
def editar_livro(livro_id):
    livro = Livro.query.get(livro_id)
    if not livro:
        return jsonify({'erro': 'Livro não encontrado'}), 404
    dados = request.get_json()
    try:
        livro.titulo = dados.get('titulo', livro.titulo)
        livro.autor = dados.get('autor', livro.autor)
        livro.ano_publicacao = dados.get('ano_publicacao', livro.ano_publicacao)
        db.session.commit()
        return jsonify({'id': livro.id, 'titulo': livro.titulo, 'autor': livro.autor, 'ano_publicacao': livro.ano_publicacao}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

@livros_blueprint.route('/<int:livro_id>', methods=['DELETE'])
def excluir_livro(livro_id):
    livro = Livro.query.get(livro_id)
    if not livro:
        return jsonify({'erro': 'Livro não encontrado'}), 404
    try:
        db.session.delete(livro)
        db.session.commit()
        return jsonify({'message': 'Livro excluído com sucesso'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500
