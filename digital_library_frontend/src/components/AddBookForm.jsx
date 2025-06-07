// digital_library_frontend/src/components/AddBookForm.jsx

import React, { useState } from 'react';

/**
 * Componente AddBookForm para adicionar novos livros à biblioteca.
 * Fornece um formulário com campos para título, autor e ISBN.
 *
 * @param {object} props - As propriedades passadas para o componente.
 * @param {function} props.onAddBook - Função de callback chamada ao submeter o formulário.
 */
function AddBookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    // Validação básica do lado do cliente (RF005: Robustez - Complemento UI)
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      alert('Por favor, preencha todos os campos!'); // Exemplo simples de feedback
      return;
    }

    // Chama a função de callback passada por props, que lidará com a lógica de adição (e API simulada)
    onAddBook({ title, author, isbn });

    // Limpa o formulário após a submissão (opcional)
    setTitle('');
    setAuthor('');
    setIsbn('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Título:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
            Autor:
          </label>
          <input
            type="text"
            id="author"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="isbn" className="block text-gray-700 text-sm font-bold mb-2">
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Adicionar Livro
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;
