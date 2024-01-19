const express = require('express');
const Router = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();

let PORT = process.env.PORT;

const app = express();
app.use(express.json());

const url = `mongodb+srv://arjunsenthildev:WYGUn1RYCc1i7kHL@bonknads.ctsh71u.mongodb.net/?retryWrites=true&w=majority`;

/*
mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    });
*/
app.use(Router);
app.listen(PORT, () => {
    console.log('Server at port ',PORT);
});