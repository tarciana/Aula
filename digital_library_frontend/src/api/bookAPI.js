    // digital_library_frontend/src/api/bookApi.js

    // RF007: Persistência de Dados (Conceitual) - dados estáticos
    // Simulação de um "backend" que armazena os livros.
    // Em um sistema real, isso interagiria com um banco de dados.
    let booksData = [
      {
        title: 'A Revolução dos Bichos',
        author: 'George Orwell',
        isbn: '978-85-3590-951-1',
        read: false,
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '978-85-3591-482-9',
        read: true,
      },
      {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        isbn: '978-85-7827-024-8',
        read: false,
      },
      {
        title: 'Dom Quixote',
        author: 'Miguel de Cervantes',
        isbn: '978-8572322521',
        read: false,
      },
    ];

    // Funções para simular a API de backend
    // Simula um atraso de rede para imitar uma chamada de API real
    const simulateApiCall = (data) =>
      new Promise((resolve) => setTimeout(() => resolve(data), 500));

    // RF002: Listar Livros
    export const getBooks = async () => {
      console.log('API: Buscando todos os livros...');
      return simulateApiCall([...booksData]); // Retorna uma cópia para evitar mutação direta
    };

    // RF003: Marcar Livro como Lido
    export const markBookAsRead = async (isbn) => {
      console.log(`API: Marcando livro com ISBN ${isbn} como lido...`);
      const bookIndex = booksData.findIndex((book) => book.isbn === isbn);
      if (bookIndex > -1) {
        booksData[bookIndex].read = true;
        return simulateApiCall(true); // Sucesso
      }
      return simulateApiCall(false); // Livro não encontrado
    };

    // RF004: Remover Livro
    export const removeBook = async (isbn) => {
      console.log(`API: Removendo livro com ISBN ${isbn}...`);
      const initialLength = booksData.length;
      booksData = booksData.filter((book) => book.isbn !== isbn);
      return simulateApiCall(booksData.length < initialLength); // Retorna true se um livro foi removido
    };

    // Função para adicionar um novo livro (RF001)
    export const addBook = async (newBook) => {
      console.log('API: Adicionando novo livro...', newBook);
      const bookExists = booksData.some((book) => book.isbn === newBook.isbn);
      if (bookExists) {
        return simulateApiCall(false); // Já existe um livro com este ISBN
      }
      booksData.push(newBook);
      return simulateApiCall(true);
    };

    // RF005: Buscar Livro (Opcional para futura expansão)
    export const searchBooks = async (query) => {
      console.log(`API: Buscando livros com a query: ${query}`);
      const filteredBooks = booksData.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.isbn.includes(query)
      );
      return simulateApiCall(filteredBooks);
    };
    