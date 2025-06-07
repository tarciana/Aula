// digital_library_frontend/src/components/BookCard.jsx

import React from 'react';

/**
 * Componente BookCard para exibir informações de um único livro e permitir ações.
 *
 * @param {object} props - As propriedades passadas para o componente.
 * @param {object} props.book - Objeto contendo os dados do livro ({ title, author, isbn, read }).
 * @param {function} [props.onMarkAsRead] - Função de callback para marcar o livro como lido.
 * @param {function} [props.onRemoveBook] - Função de callback para remover o livro.
 */
function BookCard({ book, onMarkAsRead, onRemoveBook }) {
  const { title, author, isbn, read } = book;

  const handleMarkAsReadClick = () => {
    if (onMarkAsRead && !read) {
      onMarkAsRead(isbn);
    }
  };

  const handleRemoveBookClick = () => {
    if (onRemoveBook) {
      onRemoveBook(isbn);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full
        ${read ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}
    >
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 leading-tight">{title}</h3>
        <p className="text-gray-600 text-base mb-1">
          <span className="font-medium">Autor:</span> {author}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-medium">ISBN:</span> {isbn}
        </p>
        <p className="font-bold mt-4 pt-2 border-t border-gray-200">
          <span className={`${read ? 'text-green-600' : 'text-yellow-600'}`}>
            Status: {read ? 'Lido' : 'Não Lido'}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-5">
        {!read && (
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleMarkAsReadClick}
          >
            Marcar como Lido
          </button>
        )}
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleRemoveBookClick}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default BookCard;
