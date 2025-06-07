// src/__tests__/BookDisplay.test.jsx

    import React from 'react';
    import { render, screen } from '@testing-library/react'; // Importa funções de renderização e query
    import '@testing-library/jest-dom'; // Para matchers estendidos como toBeInTheDocument

    import BookDisplay from '../components/BookDisplay'; // Importa o componente a ser testado

    describe('BookDisplay', () => {
      // Teste 1: Verifica se o componente renderiza corretamente o título, autor e ISBN
      test('renders book title, author, and ISBN', () => {
        // Arrange: Prepara os dados do livro para o teste
        const book = {
          title: 'O Pequeno Príncipe',
          author: 'Antoine de Saint-Exupéry',
          isbn: '978-8578270690',
          read: false,
        };

        // Act: Renderiza o componente BookDisplay com os dados do livro
        render(
          <BookDisplay
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            read={book.read}
          />
        );

        // Assert: Verifica se os elementos com o texto esperado estão presentes no documento
        expect(screen.getByText(/O Pequeno Príncipe/i)).toBeInTheDocument(); // Título (case-insensitive)
        expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument(); // Autor
        expect(screen.getByText(/978-8578270690/i)).toBeInTheDocument(); // ISBN
      });

      // Teste 2: Verifica se o status "Lido" é exibido corretamente quando o livro está lido
      test('displays "Lido" status when book is read', () => {
        // Arrange: Prepara os dados de um livro lido
        const book = {
          title: 'O Apanhador no Campo de Centeio',
          author: 'J.D. Salinger',
          isbn: '978-0316769174',
          read: true, // Livro está lido
        };

        // Act: Renderiza o componente com o livro lido
        render(
          <BookDisplay
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            read={book.read}
          />
        );

        // Assert: Verifica se o texto "Lido" está presente no documento
        expect(screen.getByText('Lido')).toBeInTheDocument();
        // Garante que o texto "Não Lido" NÃO esteja presente
        expect(screen.queryByText('Não Lido')).not.toBeInTheDocument();
      });

      // Teste 3: Verifica se o status "Não Lido" é exibido corretamente quando o livro não está lido
      test('displays "Não Lido" status when book is not read', () => {
        // Arrange: Prepara os dados de um livro não lido
        const book = {
          title: 'O Grande Gatsby',
          author: 'F. Scott Fitzgerald',
          isbn: '978-0743273565',
          read: false, // Livro não está lido
        };

        // Act: Renderiza o componente com o livro não lido
        render(
          <BookDisplay
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            read={book.read}
          />
        );

        // Assert: Verifica se o texto "Não Lido" está presente no documento
        expect(screen.getByText('Não Lido')).toBeInTheDocument();
        // Garante que o texto "Lido" NÃO esteja presente
        expect(screen.queryByText('Lido')).not.toBeInTheDocument();
      });

      // Teste 4: Verifica a aplicação de classes Tailwind CSS para o status (opcional, mas bom para robustez)
      test('applies correct Tailwind CSS classes based on read status', () => {
        // Arrange: Livro lido e não lido
        const readBook = { title: 'Read', author: 'A', isbn: '1', read: true };
        const unreadBook = { title: 'Unread', author: 'B', isbn: '2', read: false };

        // Act: Renderiza ambos
        const { getByText: getByTextRead } = render(<BookDisplay {...readBook} />);
        const { getByText: getByTextUnread } = render(<BookDisplay {...unreadBook} />);

        // Assert: Verifica as classes aplicadas aos spans de status
        // Acessamos o elemento pai do texto "Lido" ou "Não Lido"
        expect(getByTextRead('Lido').closest('span')).toHaveClass('bg-green-100');
        expect(getByTextRead('Lido').closest('span')).toHaveClass('text-green-800');

        expect(getByTextUnread('Não Lido').closest('span')).toHaveClass('bg-yellow-100');
        expect(getByTextUnread('Não Lido').closest('span')).toHaveClass('text-yellow-800');
      });

    });
    