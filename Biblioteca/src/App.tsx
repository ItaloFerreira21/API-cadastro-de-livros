import React from 'react';
import './App.css';
import { Header } from './component/Header'
import { MainContent } from './component/MainContent';
import {Footer} from './component/Footer';




export const App: React.FC = () => {
  return (
    <div>
      <Header  />
      <MainContent />
      <Footer />
    </div>
  );
};
