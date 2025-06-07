# digital_library_pytest/api_logic.py

from .book_manager import BookManager
from .book import Book

# Simula uma instância "global" do gerenciador de livros para as operações da API.
# Em um cenário real, esta instância seria gerenciada por um framework web (Flask, FastAPI)
# e potencialmente interagiria com um banco de dados.
library_manager = BookManager()

# Adiciona alguns livros iniciais para simular um estado inicial do "backend"
# Isso garante que a UI já tenha alguns dados para exibir ao carregar.
try:
    library_manager.add_book(Book("A Revolução dos Bichos", "George Orwell", "978-8535905141"))
    library_manager.add_book(Book("1984", "George Orwell", "978-8535905142"))
    library_manager.add_book(Book("Admirável Mundo Novo", "Aldous Huxley", "978-8575225027"))
    library_manager.add_book(Book("O Senhor dos Anéis", "J.R.R. Tolkien", "978-8535905143"))
except ValueError:
    # Ignora se os livros já existirem (útil para reinícios do servidor simulado)
    pass


def add_book_api(title: str, author: str, isbn: str):
    """
    Simula a lógica de adicionar um livro via API.
    Cria um objeto Book e tenta adicioná-lo ao BookManager.
    Retorna True em caso de sucesso, levanta ValueError em caso de falha.
    """
    try:
        new_book = Book(title, author, isbn)
        library_manager.add_book(new_book)
        # Retorna os dados do livro adicionado (como uma API faria)
        return {"success": True, "book": {"title": title, "author": author, "isbn": isbn, "read": False}}
    except ValueError as e:
        # Re-levanta o erro para ser tratado pela camada que chamou (frontend simulado)
        raise e

def get_all_books_api():
    """
    Simula a lógica de listar todos os livros via API.
    Retorna uma lista de dicionários representando os livros.
    """
    books_data = []
    for book in library_manager.list_books():
        books_data.append({
            "title": book.title,
            "author": book.author,
            "isbn": book.isbn,
            "read": book.read
        })
    return {"success": True, "books": books_data}

def mark_book_as_read_api(isbn: str):
    """
    Simula a lógica de marcar um livro como lido via API.
    """
    try:
        library_manager.mark_as_read(isbn)
        return {"success": True, "message": f"Livro com ISBN {isbn} marcado como lido."}
    except ValueError as e:
        raise e

def remove_book_api(isbn: str):
    """
    Simula a lógica de remover um livro via API.
    """
    try:
        library_manager.remove_book(isbn)
        return {"success": True, "message": f"Livro com ISBN {isbn} removido com sucesso."}
    except ValueError as e:
        raise e

