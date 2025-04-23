import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection
import { Document, pdfjs } from 'react-pdf';
import './Add.css';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [poster, setPoster] = useState<File | null>(null);
  const [pdf, setPDF] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false); // To show loading text
  const [popupMessage, setPopupMessage] = useState(''); // Message for the popup
  const [showPopup, setShowPopup] = useState(false); // Whether to show the popup
  const navigate = useNavigate(); // Hook for redirection

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pdfFile = e.target.files[0];
      setPDF(pdfFile);

      // Set loading state
      setLoading(true);

      // Use react-pdf to load the PDF and get the number of pages
      const reader = new FileReader();
      reader.onload = () => {
        const pdfData = reader.result as ArrayBuffer;
        const loadingTask = pdfjs.getDocument(pdfData);

        loadingTask.promise.then((pdf) => {
          setNumPages(pdf.numPages);
          setTotalPages(pdf.numPages.toString()); // Update totalPages
          setLoading(false); // Reset loading state once done
        }).catch((error) => {
          console.error('Error loading PDF:', error);
          setLoading(false);
        });
      };
      reader.readAsArrayBuffer(pdfFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!poster || !pdf) return alert('Both PDF and Poster are required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('totalPages', totalPages);
    formData.append('poster', poster);
    formData.append('pdf', pdf);
    formData.append('author', author);
    formData.append('genre', genre);


    try {
      const res = await axios.post('/books/new', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      // Show custom popup message after successful upload
      setPopupMessage('Book uploaded successfully!');
      setShowPopup(true);

      // Redirect to home after 5 seconds
      setTimeout(() => {
        navigate('/books'); // Redirect to the books page (adjust the route if needed)
      }, 5000);
    } catch (err) {
      console.error(err);
      setPopupMessage('Upload failed. Please try again.');
      setShowPopup(true); // Show error message in the popup
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Book Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Total Pages:</label>
          <input
            type="number"
            value={totalPages}
            onChange={e => setTotalPages(e.target.value)}
            required
            disabled
          />
        </div>
        <div>
          <label>Poster:</label>
          <input type="file" accept="image/*" onChange={e => setPoster(e.target.files?.[0] || null)} required />
        </div>
        <div>
          <label>PDF:</label>
          <input type="file" accept="application/pdf" onChange={handlePDFChange} required />
          {loading && <p>Loading PDF...</p>}
          {numPages && !loading && <p>Number of Pages: {numPages}</p>}
        </div>
        <div>
  <label>Author:</label>
  <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
</div>
<div>
  <label>Genre:</label>
  <input type="text" value={genre} onChange={e => setGenre(e.target.value)} required />
</div>

        <button type="submit">Upload Book</button>
      </form>

      {/* Custom Popup */}
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

export default AddBook;
