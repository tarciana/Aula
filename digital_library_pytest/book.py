# digital_library_pytest/book.py

class Book:
    """
    Representa um único livro no sistema de gerenciamento de livros.
    """
    def __init__(self, title: str, author: str, isbn: str):
        """
        Inicializa um novo livro.

        Args:
            title (str): O título do livro. Não pode ser vazio.
            author (str): O autor do livro. Não pode ser vazio.
            isbn (str): O ISBN (International Standard Book Number) do livro.
                        Deve ser único e não pode ser vazio.
        """
        if not title:
            raise ValueError("O título do livro não pode ser vazio.")
        if not author:
            raise ValueError("O autor do livro não pode ser vazio.")
        if not isbn:
            raise ValueError("O ISBN do livro não pode ser vazio.")

        self.title = title
        self.author = author
        self.isbn = isbn
        self.read = False # Por padrão, o livro é criado como não lido

    def mark_as_read(self):
        """
        Marca o livro como lido.
        """
        self.read = True

    def __str__(self):
        """
        Retorna uma representação em string amigável do livro.
        """
        status = "Lido" if self.read else "Não Lido"
        return f"Título: {self.title} | Autor: {self.author} | ISBN: {self.isbn} | Status: {status}"

    def __repr__(self):
        """
        Retorna uma representação oficial do livro para depuração.
        """
        return f"Book(title='{self.title}', author='{self.author}', isbn='{self.isbn}', read={self.read})"

    def __eq__(self, other):
        """
        Define a comparação de igualdade entre dois objetos Book.
        Considera dois livros iguais se tiverem o mesmo ISBN.
        """
        if not isinstance(other, Book):
            return NotImplemented
        return self.isbn == other.isbn

    def __hash__(self):
        """
        Define a função hash para objetos Book, permitindo que sejam usados em conjuntos ou como chaves de dicionário.
        Baseado no ISBN, que é único.
        """
        return hash(self.isbn)

