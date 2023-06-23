const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;

   res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const author_books = [];

  bookKeys.forEach((key) => {
  const book = books[key];
  if (book.author === author) {
      author_books.push(book);
  }
  });

  res.send(JSON.stringify(author_books));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const bookKeys = Object.keys(books);
  const title = req.params.title;

  bookKeys.forEach((key) => {
  const book = books[key];
  if (book.title === title) {
      res.send(JSON.stringify(book));
  }
  });
  res.send("Book Not Found!");
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const bookKeys = Object.keys(books);

  bookKeys.forEach((key) => {
      const book = books[key];
      console.log(key);
      if (key === isbn) {
          
          res.send(JSON.stringify(book.reviews));
      }
      });
});

module.exports.general = public_users;
