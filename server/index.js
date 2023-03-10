import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import postRoutes from './routes/post.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config()

// setting up body parser so we can properly send our request
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/posts', postRoutes) // this needs to  be after app.cors()

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT= process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () =>  console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message) )
