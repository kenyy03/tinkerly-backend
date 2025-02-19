const { Router } = require('express');
const addressController = require('../controllers/address.controller');
const app = Router();

app.post('/save-address',  addressController.saveAddress);

app.get('/get-address-by-user-id', addressController.getAddressByUserId);

module.exports = app;
