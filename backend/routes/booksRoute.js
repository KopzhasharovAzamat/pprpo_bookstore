import express from 'express';
import { Book } from '../models/bookModel.js';
import {createBook, updateBook, deleteBook, getAllBooks, getBookById} from '../controllers/bookController.js';

const router = express.Router();

// POST a book
router.post('/', createBook);

// GET all books
router.get('/', getAllBooks);

// GET a book by id 
router.get('/:id', getBookById);

// UPDATE a book
router.put('/:id', updateBook);

// DELETE a book
router.delete('/:id', deleteBook);

export default router;
