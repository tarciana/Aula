# digital_library_pytest/tests/test_book_manager.py

import pytest
from digital_library_pytest.book import Book
# A classe BookManager ainda não existe ou está vazia.
# O pytest reportará os erros de importação/TypeError, o que é esperado no TDD.
from digital_library_pytest.book_manager import BookManager


@pytest.fixture
def book_manager_empty():
    """Fixture que retorna uma nova instância vazia de BookManager para cada teste."""
    return BookManager()

@pytest.fixture
def book_manager_with_books():
    """Fixture que retorna uma instância de BookManager com alguns livros pré-adicionados."""
    manager = BookManager()
    manager.add_book(Book("Python Fluente", "Luciano Ramalho", "978-8575225027"))
    manager.add_book(Book("Clean Code", "Robert C. Martin", "978-0132350884"))
    return manager

@pytest.fixture
def book1():
    """Fixture que retorna uma instância de Book para uso nos testes."""
    return Book("Domain-Driven Design", "Eric Evans", "978-0321125217")


def test_book_manager_initialization(book_manager_empty):
    """
    Testa se o BookManager é inicializado corretamente com uma lista vazia de livros.
    RF002: Espera que list_books retorne uma lista vazia.
    """
    # Arrange: book_manager_empty já fornece uma instância vazia.

    # Act: (Não há ação específica, apenas a inicialização do objeto fornecido pela fixture).
    books = book_manager_empty.list_books()

    # Assert: Verifica se a lista de livros está vazia e é do tipo correto.
    assert len(books) == 0
    assert isinstance(books, list)
    # Como a lista interna é protegida por convenção (_books), não acessamos diretamente aqui para verificar o tipo,
    # mas o teste de list_books_empty já garante a lista retornada.


def test_add_book_success(book_manager_empty, book1):
    """
    RF001: Testa se um livro é adicionado com sucesso à biblioteca.
    """
    # Arrange: book_manager_empty e book1 fornecidos por fixtures.
    initial_count = len(book_manager_empty.list_books())

    # Act: Adiciona o livro.
    book_manager_empty.add_book(book1)

    # Assert: Verifica se o livro está na lista e a contagem aumentou.
    assert len(book_manager_empty.list_books()) == initial_count + 1
    assert book1 in book_manager_empty.list_books()


def test_add_duplicate_book_by_isbn(book_manager_empty, book1):
    """
    RF001: Testa se um livro duplicado (pelo ISBN) não é adicionado, levantando um ValueError.
    """
    # Arrange: Adiciona o livro inicial.
    book_manager_empty.add_book(book1)
    initial_count = len(book_manager_empty.list_books())
    # Cria um livro diferente, mas com o MESMO ISBN para simular duplicidade.
    duplicate_book = Book("Título Duplicado", "Autor Duplicado", book1.isbn)

    # Act & Assert: Tenta adicionar o duplicado e verifica se a exceção é levantada e a contagem não muda.
    with pytest.raises(ValueError, match="Livro com este ISBN já existe na biblioteca."):
        book_manager_empty.add_book(duplicate_book)
    assert len(book_manager_empty.list_books()) == initial_count


def test_list_books_empty(book_manager_empty):
    """
    RF002: Testa se a lista de livros está vazia quando nenhum livro foi adicionado.
    """
    # Arrange: book_manager_empty já fornece uma instância vazia.

    # Act: Lista os livros.
    books = book_manager_empty.list_books()

    # Assert: Verifica se a lista retornada está vazia e é uma lista.
    assert len(books) == 0
    assert isinstance(books, list)


def test_list_books_with_multiple_books(book_manager_with_books):
    """
    RF002: Testa se a lista de livros retorna todos os livros adicionados.
    """
    # Arrange: book_manager_with_books já fornece um manager com livros.

    # Act: Lista os livros.
    books = book_manager_with_books.list_books()

    # Assert: Verifica se a quantidade de livros é a esperada e se os livros estão presentes.
    assert len(books) == 2 # Hardcoded para 2 livros na fixture book_manager_with_books
    assert Book("Python Fluente", "Luciano Ramalho", "978-8575225027") in books
    assert Book("Clean Code", "Robert C. Martin", "978-0132350884") in books
    # Garante que a lista retornada é uma CÓPIA da lista interna, não a mesma referência.
    assert books is not book_manager_with_books._books


def test_mark_as_read_success(book_manager_with_books):
    """
    RF003: Testa se um livro é marcado como lido com sucesso usando seu ISBN.
    """
    # Arrange: Pega um livro conhecido da fixture e confirma que não está lido.
    book_to_mark = book_manager_with_books.list_books()[0] # Pega o primeiro livro
    assert book_to_mark.read is False

    # Act: Marca o livro como lido.
    book_manager_with_books.mark_as_read(book_to_mark.isbn)

    # Assert: Verifica se o status 'read' do livro foi alterado para True.
    assert book_to_mark.read is True


def test_mark_as_read_book_not_found(book_manager_empty):
    """
    RF003, RNF005: Testa se um ValueError é levantado ao tentar marcar um livro inexistente como lido.
    """
    # Arrange: book_manager_empty já é uma instância vazia.
    non_existent_isbn = "999-9999999999"

    # Act & Assert: Tenta marcar um livro inexistente e verifica a exceção.
    with pytest.raises(ValueError, match=f"Livro com ISBN '{non_existent_isbn}' não encontrado."):
        book_manager_empty.mark_as_read(non_existent_isbn)


def test_remove_book_success(book_manager_with_books):
    """
    RF004: Testa se um livro é removido com sucesso da biblioteca usando seu ISBN.
    """
    # Arrange: Pega um livro conhecido da fixture.
    book_to_remove = book_manager_with_books.list_books()[0] # Pega o primeiro livro
    initial_count = len(book_manager_with_books.list_books())

    # Act: Remove o livro.
    book_manager_with_books.remove_book(book_to_remove.isbn)

    # Assert: Verifica se o livro não está mais na lista e a contagem diminuiu.
    assert len(book_manager_with_books.list_books()) == initial_count - 1
    assert book_to_remove not in book_manager_with_books.list_books()


def test_remove_book_not_found(book_manager_empty):
    """
    RF004, RNF005: Testa se um ValueError é levantado ao tentar remover um livro inexistente.
    """
    # Arrange: book_manager_empty já é uma instância vazia.
    non_existent_isbn = "999-9999999999"

    # Act & Assert: Tenta remover um livro inexistente e verifica a exceção.
    with pytest.raises(ValueError, match=f"Livro com ISBN '{non_existent_isbn}' não encontrado para remoção."):
        book_manager_empty.remove_book(non_existent_isbn)

