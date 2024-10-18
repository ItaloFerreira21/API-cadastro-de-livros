import React from 'react';
import './App.css';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { Outlet } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <div>
        <Header />
      <Outlet /> {/* Componente que renderiza a rota atual */}
        <Footer />
    
    </div>
  );
};
