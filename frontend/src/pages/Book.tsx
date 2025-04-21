import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import "../Books.css";
import Sidebar from "../components/sidebar/Sidebar";
import "../Modal.css"; // Create this for modal styling

type Book = {
  _id: string;
  title: string;
  description: string;
  poster: string;
  pagesRead: number;
  totalPages: number;
};

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const openModal = (book: Book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <div className="books-container">
        <div className="book-grid">
          {books.map((book, index) => (
            <div key={index} onClick={() => openModal(book)}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-body">
              <div className="poster-section">
                <img src={`http://localhost:5000${selectedBook.poster}`} alt={selectedBook.title} />
              </div>
              <div className="details-section">
                <h2>{selectedBook.title}</h2>
                <p>{selectedBook.description}</p>
                <button
                  onClick={() =>
                    window.location.href = `/read/${selectedBook._id}`
                  }
                >
                  Continue Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
