import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import "./MyBooks.css";
import "../Modal.css";

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

  const handleDeleteBook = async () => {
    if (selectedBook) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${selectedBook.title}"?`
      );
      if (!confirmDelete) return;
  
      try {
        console.log("🧼 Deleting book with ID:", selectedBook._id);
        
        const res = await axios.delete(`/books/${selectedBook._id}`, {
          withCredentials: true,
        });
        console.log("Deleted");
        setBooks((prev) =>
          prev.filter((book) => book._id !== selectedBook._id)
        );
        setSelectedBook(null);
      } catch (error) {
        console.error("Failed to delete book", error);
      }
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
            onClick={(e) => e.stopPropagation()}
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
                <button
                  style={{ backgroundColor: "#dc3545", marginTop: "10px" }}
                  onClick={handleDeleteBook}
                >
                  Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
