import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import apiRouter from './src/routes/api.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Mongoose Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    console.log(err)
    process.exit();
});

// App
const app = express();
app.use(cors());
// parse request bodies (req.body)
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Serving static assets
app.use(express.static('public'))
// logger
app.use(morgan('combined'))

// API Routes
app.get('/', (req, res) => {
    res.status(200).send({ 'message': 'Welcome to your Express App API.' })
});

app.use('/api/v1/', apiRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});



app.listen(PORT, HOST);
console.log(`Server is running on port ${PORT}`);
console.log(`Running on http://${HOST}:${PORT}`);