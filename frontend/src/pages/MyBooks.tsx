import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MyBooks.css";
import "../Modal.css"

interface Book {
  _id: string;
  title: string;
  poster: string;
  pdfUrl: string;
  pagesRead: number;
  totalPages: number;
}

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books/", { withCredentials: true });
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = searchTerm.trim()
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : books;

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleReadBook = () => {
    if (selectedBook) {
      navigate(`/read/${selectedBook._id}`);
    }
  };

  return (
    <div className="my-books-page">
      <h2>My Books</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="book-search-input"
      />

      {filteredBooks.length === 0 ? (
        <p style={{ marginTop: "2rem" }}>No books found.</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div key={book._id} onClick={() => handleBookClick(book)}>
              <BookCard
                book={{
                  title: book.title,
                  poster: book.poster,
                  pagesRead: book.pagesRead,
                  totalPages: book.totalPages,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedBook && (
  <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // prevent click bubbling
    >
      <button className="close-button" onClick={() => setSelectedBook(null)}>
        &times;
      </button>
      <div className="modal-body">
        <div className="poster-section">
          <img
            src={`http://localhost:5000${selectedBook.poster}`}
            alt={selectedBook.title}
          />
        </div>
        <div className="details-section">
          <h2>{selectedBook.title}</h2>
          <p>
            Progress: {selectedBook.pagesRead}/{selectedBook.totalPages} pages
          </p>
          <button onClick={handleReadBook}>Read Book</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MyBooks;
