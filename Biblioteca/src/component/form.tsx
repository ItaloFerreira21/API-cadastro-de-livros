import React, { useState, FormEvent } from 'react';
import { addLivros } from './api/apiService';
import './form.css'

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
}
const FormRegisterBooks = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const livro:Livro={
    id: Math.floor(Math.random() * 1000000000),
    titulo: title,
    autor: author,
    ano_publicacao: new Date().getFullYear(),
  }
  console.log(livro)
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    try {
      
      await addLivros(livro);
    } catch (e) {
      console.log(e)
    }
    
  };

  return (
    <>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Autor</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Submeter</button>
      </form>
    </div>
    </>
  );
};

export default FormRegisterBooks;
