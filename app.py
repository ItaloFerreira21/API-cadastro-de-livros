# API é um lugar para disponibilizar recursos /ou funcionalidades
#Objetivo - Cria uma api que disponibiliza a consuta, criação, edição e exclusão de livros

#URL base - localhost

#Endpoints - 
    # - localhost/livros (GET) (obter todos os livros)
    # - localhost/livros (POST) (criar um novo livro)
    # - localhost/livros/id (GET) (obter um livro por id)
    # - localhost/livros/id (PUT) (alterar um livro por id)
    # - localhost/livros/id (DELETE) (excluir um livro por id)

#Quais recursos - livros

'''Para criar api em python podemos usar o flask ou o jhango.
O jango é mais avançãdo, para essa api usaremos o flask'''

from flask import Flask, jsonify, request

app = Flask(__name__)

# Lista de livros
livros = [
    {'id': 1, 'titulo': 'Game of Thrones', 'autor': 'Autor'},
    {'id': 2, 'titulo': 'Cinderela', 'autor': 'Autor'},
    {'id': 3, 'titulo': 'Harry Potter', 'autor': 'J.K. Rowling'},
    {'id': 4, 'titulo': '1984', 'autor': 'George Orwell'},
    {'id': 5, 'titulo': 'O Senhor dos Anéis', 'autor': 'J.R.R. Tolkien'},
    {'id': 6, 'titulo': 'O Alquimista', 'autor': 'Paulo Coelho'}
]

# Consultar todos os livros
@app.route('/livros', methods=['GET'])
def obter_livros():
    return jsonify(livros)

# Consultar livro por ID
@app.route('/livros/<int:livro_id>', methods=['GET'])
def obter_livro(livro_id):
    livro = next((livro for livro in livros if livro['id'] == livro_id), None)
    if livro:
        return jsonify(livro), 200
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404

# Criar um novo livro 
@app.route('/livros', methods=['POST'])
def criar_livro():
    dados = request.get_json()
    
    # Verificando se os dados necessários foram fornecidos
    if not dados or 'titulo' not in dados or 'autor' not in dados:
        return jsonify({'erro': 'Dados inválidos'}), 400

    # Criando um novo livro
    novo_id = max(livro['id'] for livro in livros) + 1  # Gerar um novo ID
    novo_livro = {
        'id': novo_id,
        'titulo': dados['titulo'],
        'autor': dados['autor']
    }
    
    livros.append(novo_livro)  # Adicionando o novo livro à lista
    return jsonify(novo_livro), 201  # Retornando o novo livro com status 201 (Created)

# Função para editar um livro pelo ID
@app.route('/livros/<int:livro_id>', methods=['PUT'])
def editar_livro(livro_id):
    livro = next((livro for livro in livros if livro['id'] == livro_id), None)
    
    if not livro:
        return jsonify({'erro': 'Livro não encontrado'}), 404
    
    dados = request.get_json()
    livro['titulo'] = dados.get('titulo', livro['titulo'])
    livro['autor'] = dados.get('autor', livro['autor'])
    
    return jsonify(livro), 200

# Função auxiliar para encontrar livro por ID
def encontrar_livro(livro_id):
    return next((livro for livro in livros if livro['id'] == livro_id), None)

# Função para excluir um livro pelo ID
@app.route('/livros/<int:livro_id>', methods=['DELETE'])
def excluir_livro(livro_id):
    # Verifica se a lista de livros está vazia
    if not livros:
        return jsonify({'erro': 'Não há livros para excluir'}), 404
    
    livro = encontrar_livro(livro_id)  # Usa função auxiliar para encontrar o livro
    
    if not livro:
        return jsonify({'erro': 'Livro não encontrado'}), 404
    
    livros.remove(livro)
    return jsonify({'message': 'Livro excluído com sucesso'}), 200  # Status 200 e mensagem

# Executa o servidor Flask
if __name__ == '__main__':
    app.run(port=5000, host='localhost', debug=True)
