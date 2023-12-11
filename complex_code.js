/* complex_code.js */

// This code demonstrates a sophisticated implementation of a library management system
// It includes various functionalities like adding books, searching for books, and managing borrower records

// Define the Book class
class Book {
  constructor(title, author, isbn, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.availability = availability;
  }

  displayInfo() {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Availability: ${this.availability}`);
  }
}

// Define the Library class
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.borrowers = {};
  }

  addBook(book) {
    this.books.push(book);
    console.log(`Book "${book.title}" added to the library.`);
  }

  removeBook(isbn) {
    const index = this.books.findIndex((book) => book.isbn === isbn);
    if (index !== -1) {
      const removedBook = this.books.splice(index, 1)[0];
      console.log(`Book "${removedBook.title}" removed from the library.`);
    } else {
      console.log(`No book with ISBN "${isbn}" found in the library.`);
    }
  }

  searchByTitle(title) {
    const foundBooks = this.books.filter(
      (book) => book.title.toLowerCase().includes(title.toLowerCase())
    );
    if (foundBooks.length > 0) {
      console.log(`Found ${foundBooks.length} book(s) with matching title:`);
      foundBooks.forEach((book) => book.displayInfo());
    } else {
      console.log(`No book with title "${title}" found in the library.`);
    }
  }

  searchByAuthor(author) {
    const foundBooks = this.books.filter(
      (book) => book.author.toLowerCase().includes(author.toLowerCase())
    );
    if (foundBooks.length > 0) {
      console.log(`Found ${foundBooks.length} book(s) with matching author:`);
      foundBooks.forEach((book) => book.displayInfo());
    } else {
      console.log(`No book by author "${author}" found in the library.`);
    }
  }

  borrowBook(isbn, borrowerName) {
    const book = this.books.find((book) => book.isbn === isbn);
    if (book) {
      if (book.availability) {
        book.availability = false;
        this.addBorrower(borrowerName, isbn);
        console.log(`Book "${book.title}" borrowed by ${borrowerName}.`);
      } else {
        console.log(`Book "${book.title}" is not available for borrowing.`);
      }
    } else {
      console.log(`No book with ISBN "${isbn}" found in the library.`);
    }
  }

  returnBook(isbn, borrowerName) {
    const book = this.books.find((book) => book.isbn === isbn);
    if (book) {
      if (!book.availability) {
        book.availability = true;
        this.removeBorrower(borrowerName, isbn);
        console.log(`Book "${book.title}" returned by ${borrowerName}.`);
      } else {
        console.log(`Book "${book.title}" is already available.`);
      }
    } else {
      console.log(`No book with ISBN "${isbn}" found in the library.`);
    }
  }

  addBorrower(borrowerName, isbn) {
    if (!this.borrowers[borrowerName]) {
      this.borrowers[borrowerName] = [isbn];
    } else {
      this.borrowers[borrowerName].push(isbn);
    }
  }

  removeBorrower(borrowerName, isbn) {
    if (this.borrowers[borrowerName]) {
      const index = this.borrowers[borrowerName].indexOf(isbn);
      if (index !== -1) {
        this.borrowers[borrowerName].splice(index, 1);
        if (this.borrowers[borrowerName].length === 0) {
          delete this.borrowers[borrowerName];
        }
      }
    }
  }

  displayBooks() {
    console.log(`Books available at ${this.name} library:`);
    this.books.forEach((book) => book.displayInfo());
  }

  displayBorrowers() {
    console.log(`Borrower records for ${this.name} library:`);
    Object.entries(this.borrowers).forEach(([borrowerName, borrowedBooks]) => {
      console.log(borrowerName);
      borrowedBooks.forEach((isbn) => {
        const book = this.books.find((book) => book.isbn === isbn);
        console.log(`- ${book.title} (${book.author})`);
      });
    });
  }
}

// Create a library instance
const myLibrary = new Library("My Library");

// Add some books to the library
myLibrary.addBook(new Book("The Catcher in the Rye", "J.D. Salinger", "9780316769488", true));
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", true));
myLibrary.addBook(new Book("1984", "George Orwell", "9780451524935", true));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", "9780143105428", true));

// Search for a book by title
myLibrary.searchByTitle("kill");

// Borrow a book
myLibrary.borrowBook("9780316769488", "John");

// Return a book
myLibrary.returnBook("9780316769488", "John");

// Remove a book
myLibrary.removeBook("9780316769488");

// Display all books in the library
myLibrary.displayBooks();

// Display borrower records
myLibrary.displayBorrowers();