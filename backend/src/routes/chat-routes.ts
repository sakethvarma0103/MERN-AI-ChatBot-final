import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { upload } from "../utils/multer.js"; // handles PDF file upload
import { getAllBooks, uploadBook } from "../controllers/book-controllers.js";
import { deleteAllBooks, deleteBookById, getSingleBook, updateBookProgress } from "../controllers/book-controllers.js";

const bookRoutes = Router();

// Upload new book (with PDF file)
bookRoutes.post(
  "/new",
  verifyToken,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "poster", maxCount: 1 },
  ]),
  uploadBook
);

// Get all books for the logged-in user
bookRoutes.get("/", verifyToken, getAllBooks);

// Delete all books for the logged-in user
bookRoutes.delete("/delete", verifyToken, deleteAllBooks);

// ❌ Delete a single book by ID
bookRoutes.delete("/:id", verifyToken, deleteBookById); // <-- Add this line

// Get a single book by its ID
bookRoutes.get("/:id", verifyToken, getSingleBook);

// Update progress for a specific book
bookRoutes.put("/:id/progress", verifyToken, updateBookProgress);

export default bookRoutes;
