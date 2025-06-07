// digital_library_frontend/src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
// Importa os componentes refatorados e renomeados
import BookCard from './components/BookCard'; // AGORA É BOOKCARD, NÃO BookDisplay
import AddBookForm from './components/AddBookForm';
import CustomToast from './components/CustomToast';
import CustomConfirmModal from './components/CustomConfirmModal';
import Header from './components/Header';

// Importa as funções da API simulada (da nova pasta api)
import {
  getBooks,
  markBookAsRead,
  removeBook,
  addBook,
  // searchBooks // Deixando searchBooks comentado, pois a funcionalidade não está implementada na UI
} from './api/bookApi'; // CAMINHO ATUALIZADO PARA bookApi.js

import './index.css'; // Mantenha esta importação

function App() {
  const [books, setBooks] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('info');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isbnToRemove, setIsbnToRemove] = useState(null);

  // Função para exibir um toast (mensagem temporária)
  const showToast = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
  };

  // RF002: Listar Livros - Efeito para buscar livros ao carregar a página
  const fetchBooks = useCallback(async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      showToast('Erro ao carregar livros: ' + error.message, 'error');
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // RF001: Adicionar Livro - Manipulador de evento do formulário
  const handleAddBook = async (newBookData) => {
    try {
      const success = await addBook(newBookData);
      if (success) {
        showToast('Livro adicionado com sucesso!', 'success');
        fetchBooks();
      } else {
        showToast('Erro: Já existe um livro com este ISBN.', 'error');
      }
    } catch (error) {
      showToast('Erro ao adicionar livro: ' + error.message, 'error');
    }
  };

  // RF003: Marcar Livro como Lido - Manipulador de evento
  const handleMarkAsRead = async (isbn) => {
    try {
      const success = await markBookAsRead(isbn);
      if (success) {
        showToast('Livro marcado como lido!', 'success');
        fetchBooks();
      } else {
        showToast('Livro não encontrado ou já está lido.', 'error');
      }
    } catch (error) {
      showToast('Erro ao marcar livro como lido: ' + error.message, 'error');
    }
  };

  // RF004: Remover Livro - Manipulador de evento (Primeiro passo: abre modal de confirmação)
  const handleRemoveBook = (isbn) => {
    setIsbnToRemove(isbn);
    setIsConfirmModalOpen(true);
  };

  // RF004: Remover Livro - Confirmação da remoção após o modal
  const confirmRemoval = async () => {
    setIsConfirmModalOpen(false);
    if (isbnToRemove) {
      try {
        const success = await removeBook(isbnToRemove);
        if (success) {
          showToast('O livro foi removido.', 'success');
          fetchBooks();
        } else {
          showToast('Livro não encontrado para remoção.', 'error');
        }
      } catch (error) {
        showToast('Erro ao remover livro: ' + error.message, 'error');
      } finally {
        setIsbnToRemove(null);
      }
    }
  };

  // RF004: Remover Livro - Cancelamento da remoção no modal
  const cancelRemoval = () => {
    setIsConfirmModalOpen(false);
    setIsbnToRemove(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans">
      <Header /> {/* Componente de Cabeçalho */}

      <main className="max-w-6xl mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulário para Adicionar Livro (RF001) */}
          <div className="md:col-span-1">
            <AddBookForm onAddBook={handleAddBook} />
          </div>

          {/* RF002: Listagem de Livros */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4 text-center">Meus Livros</h2>
            {books.length === 0 ? (
              <p className="text-gray-600 text-center py-10 text-lg">Nenhum livro na biblioteca ainda. Adicione um!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.isbn}
                    book={book}
                    onMarkAsRead={handleMarkAsRead}
                    onRemoveBook={handleRemoveBook}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RF005: Busca de Livro (Opcional para futura expansão) */}
        <section className="bg-white rounded-lg shadow-xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-3">
            Buscar Livro <span className="text-gray-500 text-base">(Futura Expansão)</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por título, autor ou ISBN"
              disabled
              className="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
            />
            <button
              disabled
              className="bg-gray-400 text-white font-bold py-3 px-6 rounded-md cursor-not-allowed"
            >
              Buscar
            </button>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            Esta funcionalidade está preparada para uma futura expansão e atualmente está desabilitada.
          </p>
        </section>
      </main>

      {/* Componente CustomToast para mensagens (RF006) */}
      {toastMessage && (
        <CustomToast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}

      {/* Componente CustomConfirmModal para confirmações */}
      <CustomConfirmModal
        isOpen={isConfirmModalOpen}
        title="Tem certeza?"
        message="Você não poderá reverter esta ação!"
        onConfirm={confirmRemoval}
        onCancel={cancelRemoval}
      />
    </div>
  );
}

export default App;
