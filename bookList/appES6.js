class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList (book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;
  list.appendChild(row);
  }

  showAler (message, className) {
    const div = document.createElement('div');
    div.className =  `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function() {
      document.querySelector('.alert').remove();
  }, 3000);
  }

  deleteBook (target) {
    if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
    }
  }

  clearFields () {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

class Storage {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach(function(book) {
      const ui = new UI;
      ui.addBookToList(book);
    })
  }
  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook (isbn) {
    const books = Storage.getBooks();
    books.forEach(function(book, index) {
     if (book.isbn === isbn) {
       books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Storage.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function(e) {
  const title = document.querySelector('#title').value, 
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAler('Please fill in all fields', 'error')

  } else {
  ui.addBookToList(book);
  Storage.addBook(book);
  ui.showAler('Book added!', 'success');
  ui.clearFields();
  }

  e.preventDefault();
})

// delete
document.querySelector('#book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAler('Book removed!', 'success');

  e.preventDefault();
})