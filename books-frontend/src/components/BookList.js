import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookListItem from './BookListItem';

function BookList({ books, deleteBook }) {
  return (
    <Container className="mt-3">
      <Row>
        {books.map(book => (
          <Col sm={12} md={6} lg={4} xl={3} key={book.id}>
            <BookListItem key={book.id} book={book} deleteBook={() => deleteBook(book.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BookList;
