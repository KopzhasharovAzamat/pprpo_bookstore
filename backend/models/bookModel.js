import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
            default: 100,
        },
    },
    {
        timestamps: true,
    }
    );

export const Book = mongoose.model('Book', bookSchema);