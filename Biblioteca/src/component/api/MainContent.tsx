import React, { useEffect, useState } from 'react';
import { getLivros } from './apiService';

// Define o tipo Livro
interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
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
  console.log('livros'+ livros)
  console.log('TESTE')

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <h2>{livro.titulo}</h2>
            <p>Autor: {livro.autor}</p>
            <p>Ano: {livro.ano_publicacao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
