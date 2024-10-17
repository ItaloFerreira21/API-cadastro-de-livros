import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './component/Header';
import { MainContent } from './component/MainContent';
import { Footer } from './component/Footer';



export const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Header />
       
        <Routes>
          <Route path="/" element={<MainContent />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};
