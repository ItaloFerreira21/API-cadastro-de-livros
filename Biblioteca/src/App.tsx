import React from 'react';
import './App.css';
import { Header } from './component/header';
import { ConteudoHeader } from './component/ConteudoHeader';


export const App: React.FC = () => {
  const navLinks = [
    { name: 'Inicio', url: '/' },
    { name: 'Sobre', url: '/sobre' },
    { name: 'Contato', url: '/contato' }
  ];

  return (
    <div>
      <Header title="Biblioteca virtual" links={navLinks} />
      <ConteudoHeader />
    </div>
  );
};
