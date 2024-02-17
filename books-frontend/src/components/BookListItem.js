import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function BookListItem({ book, deleteBook }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <Card.Text>
          Author: {book.author}<br />
          Year of Publishing: {book.yearOfPublishing}<br />
          ISBN: {book.isbn}
        </Card.Text>
        <Link className="btn btn-primary" to={`/edit/${book.id}`}>Edit</Link>
        <Button variant="danger" onClick={deleteBook} className="ms-2">Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default BookListItem;
