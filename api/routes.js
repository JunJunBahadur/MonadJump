const express = require('express');
const userModel = require('./model');
const app = express();

app.post('/add', async (request, response) => {
    const user = new userModel(request.body);

    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/leaders', async (request, response) => {
    const users = await userModel.find({}).sort({score:-1}).limit(3);

    try { 
        response.send(users);
    }  catch (error) {
        response.status(500).send(error);
    }
});

app.get('/users', async (request, response) => {
    const users = await userModel.find({});

    try { 
        response.send(users);
    }  catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;