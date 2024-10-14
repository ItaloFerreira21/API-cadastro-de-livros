import React from 'react';
import './Header.css'; // Importando CSS para o cabeçalho

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Biblioteca Virtual</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">Sobre</a></li>
        </ul>
      </nav>
    </header>
  );
};


