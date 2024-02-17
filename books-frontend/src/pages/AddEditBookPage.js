import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

function AddEditBookPage({ onActionComplete }) {
  const [book, setBook] = useState({ name: '', author: '', yearOfPublishing: '', isbn: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Use this for editing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/books/${id}`, book);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/books`, book);
      }
      onActionComplete();
      navigate('/'); 
    } catch (error) {
      console.error('There was an error saving the book', error);
      // Handle error here
    }
  };

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter book name" name="name" value={book.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Author" name="author" value={book.author} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year of Publishing</Form.Label>
          <Form.Control type="text" placeholder="Year of Publishing" name="yearOfPublishing" value={book.yearOfPublishing} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control type="text" placeholder="ISBN" name="isbn" value={book.isbn} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
        <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">Cancel</Button>
      </Form>
    </Container>
  );
}

export default AddEditBookPage;
