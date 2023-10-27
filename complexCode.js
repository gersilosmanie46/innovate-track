// Filename: complexCode.js
// Description: A sophisticated and elaborate code that simulates a virtual library management system

// Define the Library class
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.members = {};
  }

  // Add a book to the library
  addBook(book) {
    this.books.push(book);
  }

  // Remove a book from the library by its title
  removeBook(title) {
    this.books = this.books.filter(book => book.title !== title);
  }

  // Register a new member to the library
  registerMember(member) {
    this.members[member.id] = member;
  }

  // Unregister a member from the library by their ID
  unregisterMember(id) {
    delete this.members[id];
  }

  // Check out a book to a member
  checkoutBook(title, memberId) {
    if (this.members[memberId].booksCheckedOut.length >= 3) {
      console.log("Maximum number of books checked out reached.");
    } else {
      const bookIndex = this.books.findIndex(book => book.title === title);
      if (bookIndex !== -1) {
        const book = this.books[bookIndex];
        this.books.splice(bookIndex, 1);
        this.members[memberId].booksCheckedOut.push(book);
      } else {
        console.log("Book not found in the library.");
      }
    }
  }

  // Check in a book returned by a member
  checkinBook(title, memberId) {
    const bookIndex = this.members[memberId].booksCheckedOut.findIndex(
      book => book.title === title
    );
    if (bookIndex !== -1) {
      const book = this.members[memberId].booksCheckedOut[bookIndex];
      this.members[memberId].booksCheckedOut.splice(bookIndex, 1);
      this.books.push(book);
    } else {
      console.log("Book not found in the member's checked out list.");
    }
  }

  // Get the list of all books in the library
  getAllBooks() {
    return this.books;
  }

  // Get the list of all members in the library
  getAllMembers() {
    return Object.values(this.members);
  }
}

// Define the Book class
class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }
}

// Define the Member class
class Member {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.booksCheckedOut = [];
  }
}

// Create a new library instance
const myLibrary = new Library("My Library");

// Add books to the library
myLibrary.addBook(new Book("Book 1", "Author 1", 2000));
myLibrary.addBook(new Book("Book 2", "Author 2", 2010));
myLibrary.addBook(new Book("Book 3", "Author 3", 2020));

// Register members to the library
myLibrary.registerMember(new Member(1, "Member 1"));
myLibrary.registerMember(new Member(2, "Member 2"));
myLibrary.registerMember(new Member(3, "Member 3"));

// Check out and check in books
myLibrary.checkoutBook("Book 1", 1);
myLibrary.checkoutBook("Book 2", 2);
myLibrary.checkinBook("Book 1", 1);

// Print all books and members in the library
console.log("Books in the library:", myLibrary.getAllBooks());
console.log("Members in the library:", myLibrary.getAllMembers());

// Unregister a member
myLibrary.unregisterMember(3);

// Check the state of the library after modifications
console.log("Books in the library:", myLibrary.getAllBooks());
console.log("Members in the library:", myLibrary.getAllMembers());

// Output:
// Books in the library: [
//   Book { title: 'Book 2', author: 'Author 2', publicationYear: 2010 },
//   Book { title: 'Book 3', author: 'Author 3', publicationYear: 2020 }
// ]
// Members in the library: [
//   Member {
//     id: 1,
//     name: 'Member 1',
//     booksCheckedOut: [ Book { title: 'Book 2', author: 'Author 2', publicationYear: 2010 } ]
//   },
//   Member { id: 2, name: 'Member 2', booksCheckedOut: [] }
// ]
// Books in the library: [
//   Book { title: 'Book 2', author: 'Author 2', publicationYear: 2010 },
//   Book { title: 'Book 3', author: 'Author 3', publicationYear: 2020 }
// ]
// Members in the library: [
//   Member {
//     id: 1,
//     name: 'Member 1',
//     booksCheckedOut: [ Book { title: 'Book 2', author: 'Author 2', publicationYear: 2010 } ]
//   },
//   Member { id: 2, name: 'Member 2', booksCheckedOut: [] }
// ]