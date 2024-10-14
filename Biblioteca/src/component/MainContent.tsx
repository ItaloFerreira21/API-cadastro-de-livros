import React, { useEffect, useState } from 'react';
import { getLivros } from './api/apiService';
import {LivroItem }from './LivroItem';
import './MainContent.css'; // Importando CSS para o conteúdo principal



export interface Livro {
  id: number;
  title: string;
  author: string;
  year: number;
}


export const MainContent: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const livrosData = await getLivros();
        setLivros(livrosData);
      } catch (error) {
        console.error('Erro ao carregar os livros:', error);
        setError('Erro ao carregar os livros. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="main-content">
      <h1>Lista de Livros</h1>
      {livros.map((livro) => (
        <LivroItem key={livro.id} {...livro} />
      ))}
    </div>
  );
};


