import React from 'react';
import './App.css';
import { Header } from './component/header';


export const App: React.FC = () => {
  const navLinks = [
    { name: 'Inicio', url: '/' },
    { name: 'Sobre', url: '/sobre' },
    { name: 'Contato', url: '/contato' }
  ];

  return (
    <div>
      <Header title="Biblioteca virtual" links={navLinks} />
      {/* Conteúdo da página abaixo do Header */}
    </div>
  );
};
