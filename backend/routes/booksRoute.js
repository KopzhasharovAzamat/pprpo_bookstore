import express from 'express';
import { Book } from '../models/bookModel.js';
import {createBook, updateBook, deleteBook, getAllBooks, getBookById} from '../controllers/bookController.js';

import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// require auth for all book routes
router.use(requireAuth)

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
