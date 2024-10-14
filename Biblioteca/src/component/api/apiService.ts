import axios from 'axios';

// Define o tipo Livro
interface Livro {
  id: number;
  title: string;
  author: string;
  year: number;
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // URL base da sua API Flask
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para obter a lista de livros
export const getLivros = async (): Promise<Livro[]> => {
  try {
    const response = await apiClient.get('/livros'); 
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os livros:', error);
    throw error;
  }
};

// Função para obter um livro por ID
export const getLivrosById = async (id: number): Promise<Livro> => {
  try {
    const response = await apiClient.get(`/livros/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o livro:', error);
    throw error;
  }
};

// Função para criar um novo livro
export const addLivros = async (livro: Livro) => {
  try {
    const response = await apiClient.post('/livros', livro);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar o livro:', error);
    throw error;
  }
};

// Função para atualizar um livro existente
export const updateLivro = async (id: number, updatedLivro: Livro) => {
  try {
    const response = await apiClient.put(`/livros/${id}`, updatedLivro);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o livro:', error);
    throw error;
  }
};

// Função para excluir um livro
export const deleteLivro = async (id: number) => {
  try {
    await apiClient.delete(`/livros/${id}`);
    return 'Livro excluído com sucesso';
  } catch (error) {
    console.error('Erro ao excluir o livro:', error);
    throw error;
  }
};
