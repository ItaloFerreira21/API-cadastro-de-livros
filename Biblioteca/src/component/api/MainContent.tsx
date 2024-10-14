import React, { useEffect, useState } from 'react';
import { getLivros } from './apiService';

// Define o tipo Livro
interface Livro {
  id: number;
  title: string;
  author: string;
  year: number;
}

export const MainContent: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const livrosData = await getLivros();
        setLivros(livrosData);
      } catch (error) {
        console.error('Erro ao carregar os livros:', error);
        setError('Erro ao carregar os livros. Tente novamente mais tarde.'); // Atualiza o estado de erro
      } finally {
        setLoading(false); // Independentemente do resultado, atualiza o estado de carregamento
      }
    };

    fetchLivros();
  }, []);

  // Mensagem de carregamento
  if (loading) {
    return <p>Carregando livros...</p>;
  }

  // Mensagem de erro
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <h2>{livro.title}</h2>
            <p>Autor: {livro.author}</p>
            <p>Ano: {livro.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
