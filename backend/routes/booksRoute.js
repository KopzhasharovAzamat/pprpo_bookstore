import express from 'express';
import { Book } from '../models/bookModel.js';
import {createBook, updateBook, deleteBook, getAllBooks, getBookById} from '../controllers/bookController.js';

const router = express.Router();

// route for save a new book
router.post('/', createBook);
// route for get all books from database
router.get('/', getAllBooks);
// route for get one book by id from database
router.get('/:id', getBookById);
// route for update a book
router.put('/:id', updateBook);
// route for delete a book from database
router.delete('/:id', deleteBook);

export default router;
