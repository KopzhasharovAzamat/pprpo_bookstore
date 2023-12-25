import express, { response } from 'express';

// import {PORT, mongoDBURL} from './config.js';
import 'dotenv/config';

import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import cors from 'cors';

// routes
import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello!');
});


// usage of routes
app.use('/books', booksRoute);
app.use('/user', userRoute);

// connection to db
mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        app.listen(process.env.PORT, ()=> {
            console.log('App is connected to db and listening on PORT', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });