# digital_library_pytest/book_manager.py

from digital_library_pytest.book import Book

class BookManager:
    """
    Gerencia uma coleção de objetos Book.
    Permite adicionar, listar, marcar como lido e remover livros.
    """
    def __init__(self):
        """
        Inicializa o gerenciador de livros com uma lista vazia de livros.
        A lista interna é protegida por convenção (prefixo _).
        """
        self._books = [] # Lista para armazenar os objetos Book

    def add_book(self, book: Book):
        """
        Adiciona um livro à biblioteca.
        Verifica se um livro com o mesmo ISBN já existe para evitar duplicatas.

        Args:
            book (Book): O objeto Book a ser adicionado.

        Raises:
            ValueError: Se um livro com o mesmo ISBN já existir na biblioteca.
        """
        # Itera sobre os livros existentes para verificar duplicidade de ISBN
        for existing_book in self._books:
            if existing_book.isbn == book.isbn:
                raise ValueError(f"Livro com este ISBN já existe na biblioteca.")
        self._books.append(book)

    def list_books(self) -> list[Book]:
        """
        Retorna uma lista de todos os livros na biblioteca.
        Retorna uma cópia da lista para evitar modificações externas diretas.

        Returns:
            list[Book]: Uma nova lista contendo todos os livros.
        """
        return list(self._books) # Retorna uma cópia para proteger a lista interna

    def mark_as_read(self, isbn: str):
        """
        Marca um livro como lido, dado o seu ISBN.

        Args:
            isbn (str): O ISBN do livro a ser marcado como lido.

        Raises:
            ValueError: Se o livro com o ISBN fornecido não for encontrado.
        """
        found = False
        for book in self._books:
            if book.isbn == isbn:
                book.mark_as_read() # Chama o método da classe Book
                found = True
                break
        if not found:
            raise ValueError(f"Livro com ISBN '{isbn}' não encontrado.")

    def remove_book(self, isbn: str):
        """
        Remove um livro da biblioteca, dado o seu ISBN.

        Args:
            isbn (str): O ISBN do livro a ser removido.

        Raises:
            ValueError: Se o livro com o ISBN fornecido não for encontrado.
        """
        # Cria uma nova lista sem o livro a ser removido
        initial_len = len(self._books)
        # Filtra a lista para remover o livro com o ISBN correspondente
        self._books = [book for book in self._books if book.isbn != isbn]
        # Se o tamanho da lista não mudou, significa que o livro não foi encontrado
        if len(self._books) == initial_len:
            raise ValueError(f"Livro com ISBN '{isbn}' não encontrado para remoção.")

