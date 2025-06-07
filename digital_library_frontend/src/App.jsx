    // src/App.jsx

    import React from 'react';
    import BookDisplay from './components/BookDisplay'; // Importa o novo componente
    import './index.css'; // Garante que o Tailwind CSS e estilos globais estão sendo importados

    function App() {
      // Dados de livros de exemplo para exibir
      const sampleBooks = [
        {
          title: "A Revolução dos Bichos",
          author: "George Orwell",
          isbn: "978-8535905141",
          read: true,
        },
        {
          title: "1984",
          author: "George Orwell",
          isbn: "978-8535905142",
          read: false,
        },
        {
          title: "Admirável Mundo Novo",
          author: "Aldous Huxley",
          isbn: "978-8575225027",
          read: false,
        },
        {
          title: "O Senhor dos Anéis",
          author: "J.R.R. Tolkien",
          isbn: "978-8535905143",
          read: true,
        },
      ];

      return (
        <div className="min-h-screen bg-gray-100 p-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Minha Biblioteca Mágica</h1>
            <p className="text-lg text-gray-600">Seus livros favoritos em um só lugar!</p>
          </header>

          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sampleBooks.map((book, index) => (
              <BookDisplay
                key={index} // Idealmente, use um ID único do livro como key, mas index serve para exemplo.
                title={book.title}
                author={book.author}
                isbn={book.isbn}
                read={book.read}
              />
            ))}
          </main>
        </div>
      );
    }

    export default App;
    