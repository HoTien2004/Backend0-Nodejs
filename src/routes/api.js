const express = require('express');

const routerAPI = express.Router();

const apiController = require('../controllers/apiController');

const customerController = require('../controllers/customerController');

routerAPI.get('/', (req, res) => {
    res.send("hello world with apis");
});

routerAPI.get('/users', apiController.getUsersAPI);
routerAPI.post('/users', apiController.postCreateUserAPI);
routerAPI.put('/users', apiController.putUpdateUserAPI);
routerAPI.delete('/users', apiController.deleteUserAPI);

routerAPI.post('/file', apiController.postUploadSingleFileAPI);
routerAPI.post('/files', apiController.postUploadMultipleFileAPI);

routerAPI.post('/customers', customerController.postCreateCustomer);
routerAPI.post('/customers-many', customerController.postCreateArrayCustomer);
routerAPI.get('/customers', customerController.getAllCustomers);
routerAPI.put('/customers', customerController.putUpdateCustomers);

module.exports = routerAPI;