import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// route for save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Напишите все требуемые поля: название, автор, год выпуска',
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// route for get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    };
});
// route for get one book by id from database
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    };
});
// route for update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Напишите все требуемые поля: название, автор, год выпуска',
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Книга не найдена' });
        }
        return response.status(200).send({ message: 'Книга отредактирована' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    };
});
// route for delete a book from database
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Книга не найдена' });
        }
        return response.status(200).send({ message: 'Книга удалена' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    };
});
export default router;