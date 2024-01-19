const express = require('express');
const userModel = require('./model');
const app = express();
const url = require('url');
const axios = require('axios');
require('dotenv').config();


app.get('/auth/discord/redirect', async (req, res) => {
    const { code } = req.query;

    if (code) {
        const formData = new url.URLSearchParams({
            client_id: process.env.ClientID,
            client_secret: process.env.ClientSecret,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: 'http://localhost:3000/auth/discord/redirect',
        });

        const output = await axios.post('https://discord.com/api/v10/oauth2/token', 
            formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        if(output.data) {
            const access = output.data.access_token;

            const userInfo = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    'Authorization': `Bearer ${access}`,
                },
            });

            //refresh

            const formDataRe = new url.URLSearchParams({
                client_id: process.env.ClientID,
                client_secret: process.env.ClientSecret,
                grant_type: 'refresh_token',
                refresh_token: output.data.refresh_token,
            });
    
            const refresh = await axios.post('https://discord.com/api/v10/oauth2/token', 
                formDataRe, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            console.log(output.data, userInfo.data, refresh.data);

        }
    }
});

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