import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Add.css';

const UpdateBook: React.FC = () => {
  const [title, setTitle] = useState('');

  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get book ID from URL

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/books/${id}`, { withCredentials: true });
        console.log(res.data); // Log the response to check
        const { title, author, genre } = res.data;
        setTitle(title);
        setAuthor(author);
        setGenre(genre);
      } catch (err) {
        console.error('Failed to fetch book:', err);
      }
    };
  
    fetchBook();
  }, [id]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
  
    // Log the formData content for debugging
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  
    try {
      await axios.put(`/books/${id}`, formData, {
        withCredentials: true,
      });
  
      setPopupMessage('Book updated successfully!');
      setShowPopup(true);
      setTimeout(() => navigate('/books'), 3000);
    } catch (err) {
      console.error(err);
      setPopupMessage('Update failed. Please try again.');
      setShowPopup(true);
    }
  };
  

  return (
    <div className="add-book-form">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Book Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" value={genre} onChange={e => setGenre(e.target.value)} required />
        </div>

        <button type="submit">Update Book</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
