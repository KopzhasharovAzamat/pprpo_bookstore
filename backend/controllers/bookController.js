import express from 'express';
import { Book } from '../models/bookModel.js';
import mongoose from 'mongoose';


// create book
export const createBook = async (request, response) => {
    const {title, author, publishYear, cost} = request.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!author){
        emptyFields.push('author')
    }
    if(!publishYear){
        emptyFields.push('publishYear')
    }
    if(!cost){
        emptyFields.push('cost')
    }
    if(emptyFields.length > 0){
        return response.status(400).json({ error: 'Fill in all the fields', emptyFields })
    }

    try {
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            cost: request.body.cost,
        };
        const book = await Book.create(newBook);
        return response.status(201).json(book);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

// update book
export const updateBook = async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).json({
                message: 'Напишите все требуемые поля: название, автор, год выпуска',
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate({_id: id}, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Книга не найдена' });
        }
        return response.status(200).json({ message: 'Книга отредактирована' });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    };
};

// delete book
export const deleteBook = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete({_id: id});
        if (!result) {
            return response.status(404).json({ message: 'Книга не найдена' });
        }
        return response.status(200).json({ message: 'Книга удалена' });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    };
};

// get all books
export const getAllBooks = async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    };
};

// get book by id
export const getBookById = async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    };
};


