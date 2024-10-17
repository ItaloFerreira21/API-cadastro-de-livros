import React, { useEffect, useState } from 'react';
import { getLivros } from './api/apiService';
import {LivroItem }from './LivroItem';
import './MainContent.css'; // Importando CSS para o conteúdo principal
import FormRegisterBooks from "./form"


export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
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
   livros.map((livro) => (
         console.log(livro)
      ))
  console.log(livros)
  return (
    <div className="main-content">
       <h1>Lista de Livrosssss</h1>
      {livros.map((livro,i) =>(
        <div key={i}>
          <LivroItem key={i} livro={livro} />
          </div>
      ))}
     <button>Adicionar novo livro</button>
      <FormRegisterBooks />
      
    </div>
  );
};
  //Botão para adicionar livros
interface ButtonProps {
  onClick: () => void;
}

export const CreateButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="create-button">
      <span>
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
        </svg>
        Create
      </span>
    </button>
  );
};


