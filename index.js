import express from 'express'
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from 'mongoose'
import dotenv  from "dotenv"


import postRoutes from './routes/posts.js';

const app = express();
dotenv.config()


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://dreams-dev:321dreamsapp@cluster0.l0sv8.mongodb.net/Dreams?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);