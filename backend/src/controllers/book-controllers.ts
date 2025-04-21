import { Response, NextFunction } from "express";
import User from "../models/User.js";
import { randomUUID } from "crypto";
import { Types } from "mongoose";
import { Request } from "express";
import fs from "fs";
import path from "path";

interface MulterRequest extends Request {
  files: {
    pdf?: Express.Multer.File[];
    poster?: Express.Multer.File[];
  };
}

// 📥 Upload a new book
export const uploadBook = async (req: MulterRequest, res: Response, next: NextFunction) => {
  const { title, totalPages } = req.body;
  const files = req.files;

  const pdfFile = files?.pdf?.[0];
  const posterFile = files?.poster?.[0];

  if (!pdfFile || !posterFile) {
    return res.status(400).json({ message: "Both PDF and poster must be uploaded" });
  }

  const totalPagesInt = parseInt(totalPages);
  if (isNaN(totalPagesInt)) {
    return res.status(400).json({ message: "Invalid totalPages value" });
  }

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found or invalid token" });
    }

    const newBook = {
      id: randomUUID(),
      title,
      pdfUrl: `/uploads/books/${pdfFile.filename}`,
      poster: `/uploads/books/${posterFile.filename}`,
      pagesRead: 0,
      totalPages: totalPagesInt,
      uploadedAt: new Date(),
    };

    user.books.push(newBook);
    await user.save();

    return res.status(201).json({ message: "Book uploaded successfully", book: newBook });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// 📚 Get all books for the logged-in user
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not found or token invalid");
    }

    return res.status(200).json(user.books);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// ❌ Delete all books for the logged-in user
export const deleteAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not found or token invalid");
    }

    user.books.forEach((book) => {
      const pdfPath = path.join(process.cwd(), "src", book.pdfUrl);
      const posterPath = path.join(process.cwd(), "src", book.poster);

      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
      if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
    });

    user.books.splice(0, user.books.length);
    await user.save();

    return res.status(200).json({ message: "All books deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found or token invalid" });
    }

    const bookId = req.params.id;

    // Loop through the books array and log each book's `id`
    const book = user.books.find((b) => {
      // Log to check if _id matches
      console.log(b._id.equals(new Types.ObjectId(bookId)));  // Compare ObjectIds

      return b._id.equals(new Types.ObjectId(bookId));  // Compare ObjectIds
    });
    
    if (!book) {
      console.log("Not found");
      return res.status(404).json({ message: "Book not found" });
    }

    console.log(book);
    return res.status(200).json({
      _id: book._id,  // MongoDB _id
      id: book.id,    // Custom ID
      title: book.title,
      pdfUrl: book.pdfUrl,
    });
  } catch (error) {
    console.error("Get single book error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
// 📈 Update progress for a specific book
// controllers/book-controllers.ts

export const updateBookProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found or invalid token" });
    }

    const bookId = req.params.id;
    const { progress } = req.body;

    const book = user.books.find((b) => {
      // Log to check if _id matches
      console.log(b._id.equals(new Types.ObjectId(bookId)));  // Compare ObjectIds

      return b._id.equals(new Types.ObjectId(bookId));  // Compare ObjectIds
    });
    if (!book) {
      console.log("Not found");
      return res.status(404).json({ message: "Book not found" });
    }

    book.pagesRead = progress;
    await user.save();

    return res.status(200).json({ message: "Progress updated successfully", book });
  } catch (error) {
    console.error("Update progress error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

