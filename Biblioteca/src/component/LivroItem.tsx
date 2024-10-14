import React from 'react';
import './LivroItem.css'; // Importando CSS para o item do livro

interface LivroProps {
  id: number;
  title: string;
  author: string;
  year: number;
}

export const LivroItem: React.FC<LivroProps> = ({ id, title, author, year }) => {
  return (
    <div className="livro-item">
      <h2>{title}</h2>
      <p>Autor: {author}</p>
      <p>Ano: {year}</p>
    </div>
  );
};


