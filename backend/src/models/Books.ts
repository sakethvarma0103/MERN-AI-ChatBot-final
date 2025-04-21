// models/Book.ts
import mongoose, { Schema } from "mongoose";

export interface IBook {
  id: string;
  title: string;
  pdfUrl: string;
  poster: string;
  pagesRead: number;
  totalPages: number;
  uploadedAt: Date;
}

export const BookSchema = new Schema<IBook>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: "",
  },
  pagesRead: {
    type: Number,
    default: 0,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
