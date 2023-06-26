const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const usernameReg = req.body.username;
    const passwordReg = req.body.password;

    //In case username or password is empty
    if(!usernameReg || !passwordReg){
        return res.status(404).json({message: "Error in Registration: Username or Password are blank!"});
    }

    //In case the username is taken
    let usernameFilter = users.filter((user) => usernameReg === user.username);
    
    //console.log("UserName Filter: " + JSON.stringify(usernameFilter));
    //console.log(Object.keys(usernameFilter));
    if(Object.keys(usernameFilter).length>0){ //If the size of usernameFilter is 1, it means it found the username on users.username
        return res.status(404).json({message: "Error in Registration: Username Already Taken!"});
    }

    //In case everything is alright, the registration begins
    const newUser = {
        username: usernameReg,
        password: passwordReg
    }
    users.push(newUser);

    console.log("Users: " + JSON.stringify(users));
    res.send('User successfully Registered!');
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
      //console.log(key);
      if (key === isbn) {
          res.send(JSON.stringify(book.reviews));
      }
      });
});


//Axios Promise : Get book list

public_users.get('/books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Book list retrieved!"));
  });

  //Axios Promise : Get book based on ISBN

public_users.get('/books/isbn/:isbn',function (req, res) {
    const get_isbn = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;

        resolve(res.send(books[isbn]),null,4);
      });
      get_isbn.then(() => console.log("Book base on ISBN retrieved!"));
  });


module.exports.general = public_users;
