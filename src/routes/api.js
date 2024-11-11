const express = require('express');

const routerAPI = express.Router();

const apiController = require('../controllers/apiController');

routerAPI.get('/', (req, res) => {
    res.send("hello world with apis");
});

routerAPI.get('/users', apiController.getUsersAPI);

routerAPI.post('/users', apiController.postCreateUserAPI);

routerAPI.put('/users', apiController.putUpdateUserAPI);

routerAPI.delete('/users', apiController.deleteUserAPI);

module.exports = routerAPI;