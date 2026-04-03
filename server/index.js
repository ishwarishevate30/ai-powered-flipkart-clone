import express from 'express';
import Connection from './database/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import DefaultData from './default.js';
import Router from './router/route.js';

dotenv.config();

const app = express();

const PORT = 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',Router)

const startServer = async () => {
    try {
        await Connection();

        app.listen(PORT, () => {
            console.log("Server is running on port 8000");
            DefaultData();
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
 

