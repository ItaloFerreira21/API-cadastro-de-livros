import React, { useState, FormEvent } from "react";
import { addLivros } from "./api/apiService";
import "./form.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
}

const FormRegisterBooks = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState<Date | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!anoPublicacao) {
      console.error("A data de lançamento é obrigatória.");
      return;
    }

    const livro: Livro = {
      id: 0, 
      titulo: title,
      autor: author,
      ano_publicacao: anoPublicacao.getFullYear(), //Apara aceitar o ano digitado no form
    };

    try {
      await addLivros(livro);
      console.log("Livro adicionado com sucesso:", livro);
      
      // Limpar os campos do formulário
      setAuthor("");
      setTitle("");
      setAnoPublicacao(null);

      // Exibir a mensagem de sucesso
      setSuccessMessage("Livro adicionado com sucesso!");

      // Limpar a mensagem de sucesso 
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (e) {
      console.error("Erro ao adicionar o livro:", e);
    }
  };

  return (
    <>
      <div className="container">
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
          <label htmlFor="ano_publicacao">Data de Lançamento</label>
          <DatePicker
            selected={anoPublicacao}
            onChange={(date: Date | null) => setAnoPublicacao(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/AAAA"
            className="date-picker"
            id="ano_publicacao"
          />

          <button type="submit">Adicionar</button>
        </form>

        {/* Exibir a mensagem de sucesso, se existir */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </>
  );
};

export default FormRegisterBooks;
