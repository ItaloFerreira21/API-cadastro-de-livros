import React from 'react';
import './LivroItem.css'; // Importando CSS para o item do livro
interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
}
interface LivroProps {
  livro: Livro;
}

export const LivroItem= ({ livro }:LivroProps) => {
  return (
    <div className="livro-item">
      <h2>{livro.titulo}</h2>
      <p>Autor: {livro.autor}</p>
      <p>Ano: {livro.ano_publicacao}</p>
    </div>
  );
};


