    // src/components/BookDisplay.jsx

    import React from 'react';

    /**
     * Componente BookDisplay para exibir informações de um único livro.
     * Recebe as propriedades do livro e renderiza-as em um card visualmente atraente.
     *
     * @param {object} props - As propriedades passadas para o componente.
     * @param {string} props.title - O título do livro.
     * @param {string} props.author - O autor do livro.
     * @param {string} props.isbn - O ISBN do livro.
     * @param {boolean} props.read - O status de leitura do livro (true se lido, false se não lido).
     */
    function BookDisplay({ title, author, isbn, read }) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
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
          <div className="flex items-center">
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
      );
    }

    export default BookDisplay;
    