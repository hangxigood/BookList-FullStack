var express = require('express');
var router = express.Router();

let books = [
  { id: 1, name: 'Book One', author: 'Author One', yearOfPublishing: 2001, isbn: 'ISBN1' },
  { id: 2, name: 'Book Two', author: 'Author Two', yearOfPublishing: 2002, isbn: 'ISBN2' }
];

/* GET books list. */
router.get('/', (req, res) => {
  res.json(books);
});

/* Post creating a book. */
router.post('/', (req, res) => {
  const { name, author, yearOfPublishing, isbn } = req.body;
  const book = {
    id: books.length + 1,
    name,
    author,
    yearOfPublishing,
    isbn
  };
  books.push(book);
  res.status(201).send(book);
});

/* PUT updating a book by ID. */
router.put('/:id', (req, res) => {
  const { name, author, yearOfPublishing, isbn } = req.body;
  const index = books.findIndex(book => book.id === parseInt(req.params.id));
  if (index >= 0) {
    if (!name || !author || !yearOfPublishing || !isbn) {
      return res.status(400).send({ message: "Missing fields for updating the book" });
    }
    books[index] = { ...books[index], name, author, yearOfPublishing, isbn };
    res.send(books[index]);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

/* DELETE removing a book by ID. */
router.delete('/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id));
  if (index >= 0) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});


module.exports = router;
