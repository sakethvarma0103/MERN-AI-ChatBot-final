// src/components/BookCard.tsx

import React from "react";

type Book = {
  title: string;
  poster: string;
  pagesRead: number;
  totalPages: number;
  genre: string;
  author: string;
};

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const progress = (book.pagesRead / book.totalPages) * 100;
  console.log(book.poster);
  return (
    <div className="book-card">
      <img src={`http://localhost:5000${book.poster}`} alt={book.title} className="book-poster" />
      <h3 className="book-title">{book.title}</h3>
      {(book.author || book.genre) && (
        <p className="book-meta">
          {book.author && <strong>{book.author}</strong>}
          {book.author && book.genre ? " · " : ""}
          {book.genre}
        </p>
      )}
      <div className="status-bar-container">
        <div
          className="status-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p style={{color:"black"}}>{`${book.pagesRead} / ${book.totalPages} pages read`}</p>
    </div>
  );
};

export default BookCard;
