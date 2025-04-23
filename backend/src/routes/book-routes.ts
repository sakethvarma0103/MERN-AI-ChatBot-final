import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { upload } from "../utils/multer.js";
import {
  getAllBooks,
  uploadBook,
  deleteAllBooks,
  deleteBookById,
  getSingleBook,
  updateBookProgress,
  updateBookDetails,
} from "../controllers/book-controllers.js";

const bookRoutes = Router();

bookRoutes.post(
  "/new",
  verifyToken,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "poster", maxCount: 1 },
  ]),
  uploadBook
);

bookRoutes.get("/", verifyToken, getAllBooks);
bookRoutes.delete("/delete", verifyToken, deleteAllBooks);
bookRoutes.delete("/:id", verifyToken, deleteBookById);
bookRoutes.get("/:id", verifyToken, getSingleBook);
bookRoutes.put("/:id/progress", verifyToken, updateBookProgress);
bookRoutes.put("/:id", upload.none(),verifyToken, updateBookDetails); // ✅ Update book details

export default bookRoutes;
