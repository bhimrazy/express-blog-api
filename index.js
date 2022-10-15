import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiRouter from './src/routes/api.js';
import mongoose from 'mongoose';
// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    console.log(err)
    process.exit();
});
// // Get the default connection
// const database = mongoose.connection;
// // Bind connection to error event (to get notification of connection errors)
// database.on('error', (error) => {
//     console.log(error)
// })
// database.once('connected', () => {
//     console.log('Database Connected');
// })

// App
const app = express();
// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// Serving static assets
app.use(express.static('public'))

//Swagger Configuration  
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Express API',
            version: '1.0.0'
        }
    },
    apis: ['api.js'],
}

const specs = swaggerJsdoc(swaggerOptions);
app.use(
    "/",
    // "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

// app.get('/', (req, res) => {
//     res.status(200).send(
//         {
//             'message': 'Welcome to your Express App.'
//         }
//     );
// });

app.use('/api/v1/', apiRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);