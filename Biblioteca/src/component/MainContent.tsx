import React, { useEffect, useState } from "react";
import { getLivros } from "./api/apiService";
import { LivroItem } from "./LivroItem";
import "./MainContent.css"; // Importando CSS para o conteúdo principal
import { useNavigate } from "react-router-dom";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
}

export const MainContent: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setLoading(true);
        const livrosData = await getLivros();
        console.log(livrosData);
        setLivros(livrosData);
        console.log(livros);
      } catch (error) {
        setLoading(false);
        //console.error('Erro ao carregar os livros:', error);
        setError("Erro ao carregar os livros. Tente novamente mais tarde.");
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
      {livros.map((livro, i) => (
        <div key={i}>
          <LivroItem key={i} livro={livro} />
        </div>
      ))}

      <button onClick={() => navigate("/create")} className="create-button">
        <span>
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              fill="currentColor"
            ></path>
          </svg>
          Adicionar Novo Livro
        </span>
      </button>
    </div>
  );
};
