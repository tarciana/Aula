# digital_library_pytest/tests/test_book.py

import pytest
from digital_library_pytest.book import Book

@pytest.mark.priority_high
@pytest.mark.fast_test 
def test_book_creation_success():
    """
    Testa a criação bem-sucedida de um livro com todos os atributos.
    """
    # Arrange: Dados de entrada para a criação do livro
    title = "O Senhor dos Anéis"
    author = "J.R.R. Tolkien"
    isbn = "978-0618053267"

    # Act: Criação do objeto Book
    book = Book(title, author, isbn)

    # Assert: Verificação dos atributos do livro
    assert book.title == title
    assert book.author == author
    assert book.isbn == isbn
    assert book.read is False # Livro deve ser criado como não lido por padrão

@pytest.mark.priority_high
def test_book_creation_with_empty_title_raises_error():
    """
    Testa se um ValueError é levantado ao tentar criar um livro com título vazio.
    """
    # Arrange: Título vazio
    title = ""
    author = "Autor Teste"
    isbn = "123-4567890123"

    # Act & Assert: Tentar criar o livro e verificar se a exceção é levantada
    with pytest.raises(ValueError, match="O título do livro não pode ser vazio."):
        Book(title, author, isbn)


def test_book_creation_with_empty_author_raises_error():
    """
    Testa se um ValueError é levantado ao tentar criar um livro com autor vazio.
    """
    # Arrange: Autor vazio
    title = "Título Teste"
    author = ""
    isbn = "123-4567890123"

    # Act & Assert: Tentar criar o livro e verificar se a exceção é levantada
    with pytest.raises(ValueError, match="O autor do livro não pode ser vazio."):
        Book(title, author, isbn)


def test_book_creation_with_empty_isbn_raises_error():
    """
    Testa se um ValueError é levantado ao tentar criar um livro com ISBN vazio.
    """
    # Arrange: ISBN vazio
    title = "Título Teste"
    author = "Autor Teste"
    isbn = ""

    # Act & Assert: Tentar criar o livro e verificar se a exceção é levantada
    with pytest.raises(ValueError, match="O ISBN do livro não pode ser vazio."):
        Book(title, author, isbn)


def test_mark_as_read():
    """
    Testa se o método mark_as_read altera o status do livro para True.
    """
    # Arrange: Cria um livro não lido
    book = Book("1984", "George Orwell", "978-0451524935")
    assert book.read is False # Deve começar como não lida

    # Act: Chama o método para marcar como lido
    book.mark_as_read()

    # Assert: Verifica se o status foi alterado
    assert book.read is True # Deve ser True após ser marcada como lida


def test_book_str_representation():
    """
    Testa a representação em string do livro (__str__).
    """
    # Arrange: Cria livros com diferentes status de leitura
    book_unread = Book("Duna", "Frank Herbert", "978-0441172719")
    book_read = Book("Fundação", "Isaac Asimov", "978-0553803717")
    book_read.mark_as_read()

    # Act & Assert: Verifica as representações em string
    assert str(book_unread) == "Título: Duna | Autor: Frank Herbert | ISBN: 978-0441172719 | Status: Não Lido"
    assert str(book_read) == "Título: Fundação | Autor: Isaac Asimov | ISBN: 978-0553803717 | Status: Lido"


def test_book_repr_representation():
    """
    Testa a representação oficial do livro para depuração (__repr__).
    """
    # Arrange: Cria um livro
    book = Book("O Guia do Mochileiro das Galáxias", "Douglas Adams", "978-0345391803")

    # Act & Assert: Verifica a representação oficial antes de marcar como lido
    expected_repr = "Book(title='O Guia do Mochileiro das Galáxias', author='Douglas Adams', isbn='978-0345391803', read=False)"
    assert repr(book) == expected_repr

    # Marca como lido e verifica novamente
    book.mark_as_read()
    expected_repr_read = "Book(title='O Guia do Mochileiro das Galáxias', author='Douglas Adams', isbn='978-0345391803', read=True)"
    assert repr(book) == expected_repr_read


def test_book_equality_with_non_book_object():
    """
    Testa o método __eq__ quando comparado com um objeto que não é Book.
    """
    # Arrange: Cria um livro
    book = Book("A Arte da Guerra", "Sun Tzu", "978-1590302255")

    # Act & Assert: Compara com uma string e um número.
    # Pytest lida com o NotImplemented de __eq__ retornando False.
    assert (book == "alguma string") is False
    assert (book == 123) is False
    assert (book != ["lista", "de", "livros"]) is True # Verifica que não são iguais


def test_book_hash_function():
    """
    Testa o método __hash__ e a capacidade de usar Book em conjuntos.
    """
    # Arrange: Cria dois livros com o MESMO ISBN (devem ser considerados iguais e ter o mesmo hash)
    book1 = Book("O Pequeno Príncipe", "Antoine de Saint-Exupéry", "978-8578270690")
    # Este livro tem o MESMO ISBN que book1 para testar a igualdade e hash
    book_same_isbn = Book("O Pequeno Príncipe (Outra Edição)", "Antoine de Saint-Exupéry", "978-8578270690")
    book_different_isbn = Book("Dom Quixote", "Miguel de Cervantes", "978-8572322521") # ISBN diferente

    # Act: Calcula os hashes
    hash1 = hash(book1)
    hash_same_isbn = hash(book_same_isbn)
    hash_different_isbn = hash(book_different_isbn)

    # Assert: Verifica se hashes de livros com o mesmo ISBN são iguais e de diferentes são diferentes
    assert hash1 == hash_same_isbn
    assert hash1 != hash_different_isbn

    # Act & Assert: Testa o uso em um conjunto (set), que usa hash e eq
    book_set = {book1, book_different_isbn}
    assert len(book_set) == 2 # Deve ter 2 elementos distintos, pois book1 e book_different_isbn são diferentes

    assert book1 in book_set # book1 está no set
    assert book_different_isbn in book_set # book_different_isbn está no set
    # book_same_isbn deve ser encontrado no set porque é considerado igual a book1 (pelo ISBN)
    assert book_same_isbn in book_set

