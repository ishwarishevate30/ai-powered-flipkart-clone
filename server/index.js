import express from 'express';
import Connection from './database/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import DefaultData from './default.js';
import Router from './router/route.js';

const app = express();

const PORT = 8000;
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',Router)

Connection();

app.listen(PORT, () => {
    console.log("Server is running on port 8000" );

    DefaultData();
}); 
 

