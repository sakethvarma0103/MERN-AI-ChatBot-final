import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../ReadBook.css";
import { pdfjs } from 'react-pdf';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Book {
  _id: string;
  title: string;
  pdfUrl: string;
}

const ReadBook = () => {
  const { id } = useParams();
  console.log(id);
  const [book, setBook] = useState<Book | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  let scrollTimeout: number; // Use 'number' for setTimeout in browsers

  const throttle = (callback: () => void, delay: number) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = window.setTimeout(callback, delay);
  };

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / winHeight) * 100;
    setScrollPercent(scrolled);

    const currentPage = Math.ceil((scrolled / 100) * numPages!);
    savePageProgress(currentPage);
  };

  const savePageProgress = async (page: number) => {
    try {
      await axios.put(`/books/${id}/progress`, { progress: page });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  // Throttling the scroll event
  useEffect(() => {
    const throttledHandleScroll = () => throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [numPages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="readbook-container">
      <h2 className="readbook-title">{book?.title}</h2>

      {book?.pdfUrl ? (
        <Document
          file={`http://localhost:5000${book.pdfUrl}`}
          onLoadSuccess={onDocumentLoadSuccess}
          className="pdf-document"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={600}
              className="pdf-page"
            />
          ))}
        </Document>
      ) : (
        <p className="loading-text">Loading PDF...</p>
      )}

      <div className="scroll-to-top" onClick={scrollToTop}>
        <svg className="progress-ring" width="50" height="50">
          <circle
            className="progress-ring-bg"
            cx="25"
            cy="25"
            r="20"
            strokeWidth="4"
            fill="none"
          />
          <circle
            className="progress-ring-fill"
            cx="25"
            cy="25"
            r="20"
            strokeWidth="4"
            fill="none"
            strokeDasharray="125.6"
            strokeDashoffset={125.6 - (125.6 * scrollPercent) / 100}
          />
        </svg>
        <ArrowUpwardIcon className="arrow-icon" />
      </div>
    </div>
  );
};

export default ReadBook;

