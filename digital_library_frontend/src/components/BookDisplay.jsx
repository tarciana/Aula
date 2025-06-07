// digital_library_frontend/src/components/BookDisplay.jsx

import React from 'react';

/**
 * Componente BookDisplay para exibir informações de um único livro e permitir ações.
 *
 * @param {object} props - As propriedades passadas para o componente.
 * @param {string} props.title - O título do livro.
 * @param {string} props.author - O autor do livro.
 * @param {string} props.isbn - O ISBN do livro.
 * @param {boolean} props.read - O status de leitura do livro (true se lido, false se não lido).
 * @param {function} [props.onMarkAsRead] - Função de callback para marcar o livro como lido (RF003).
 * @param {function} [props.onRemoveBook] - Função de callback para remover o livro (RF004).
 */
function BookDisplay({ title, author, isbn, read, onMarkAsRead, onRemoveBook }) {
  const handleMarkAsReadClick = () => {
    // RF003: Marcar Livro como Lido - Complemento UI
    if (onMarkAsRead && !read) { // Apenas marca se o livro ainda não estiver lido
      onMarkAsRead(isbn);
    }
  };

  const handleRemoveBookClick = () => {
    // RF004: Remover Livro - Complemento UI
    if (onRemoveBook) {
      onRemoveBook(isbn);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between">
      <div>
        {/* Título do Livro */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>

        {/* Autor do Livro */}
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Autor:</span> {author}
        </p>

        {/* ISBN do Livro */}
        <p className="text-gray-600 text-sm mb-3">
          <span className="font-medium">ISBN:</span> {isbn}
        </p>

        {/* Status de Leitura */}
        <div className="flex items-center mb-4">
          {read ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Lido
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Não Lido
            </span>
          )}
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-2">
        {!read && ( // Mostrar botão "Marcar como Lido" apenas se o livro não estiver lido (RF003)
          <button
            onClick={handleMarkAsReadClick}
            className="bg-purple-500 hover:bg-purple-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors duration-200"
          >
            Marcar como Lido
          </button>
        )}
        <button
          onClick={handleRemoveBookClick}
          className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors duration-200"
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default BookDisplay;
