const express = require('express');

const routerAPI = express.Router();

const apiController = require('../controllers/apiController');

const customerController = require('../controllers/customerController');

const projectController = require('../controllers/projectController');

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
routerAPI.delete('/customers', customerController.deleteACustomer);
routerAPI.delete('/customers-many', customerController.deleteArrayCustomers);

routerAPI.post('/projects', projectController.postCreateProject);
routerAPI.get('/projects', projectController.getAllProject);

routerAPI.get('/info', (req, res) => {
    console.log(">>> Check req.query: ", req.query)
    return res.status(200).json({
        data: req.query
    })
});

routerAPI.get('/info/:name/:address', (req, res) => {
    console.log(">>> Check req.params: ", req.params)
    return res.status(200).json({
        data: req.params
    })
});

module.exports = routerAPI;