var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3000' // Allow only frontend to access the backend
}));

app.use('/', indexRouter);
app.use('/books', booksRouter);

module.exports = app;

// Handle 404 - Route not found
app.use((req, res, next) => {
    res.status(404).send({ message: "Could not find the requested resource" });
  });
  
  // Basic error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something broke!" });
  });