import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import BookList from './components/BookList';
import AddEditBookPage from './pages/AddEditBookPage';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [books, setBooks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, [refreshKey]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle error here
    }
  };
  const deleteBook = async (id) => {
    if(window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`);
        fetchBooks(); // Refresh the books list after deletion
      } catch (error) {
        console.error('Error deleting the book:', error);
      }
    }
  };

  // Function to toggle the refreshKey state
  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey ^ 1); // Simple toggle between 0 and 1
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BookList books={books} deleteBook={deleteBook} />} />
        <Route path="/add" element={<AddEditBookPage onActionComplete={triggerRefresh} />} exact />
        <Route path="/edit/:id" element={<AddEditBookPage onActionComplete={triggerRefresh} />} exact />
      </Routes>
    </Router>
  );
}

export default App;
