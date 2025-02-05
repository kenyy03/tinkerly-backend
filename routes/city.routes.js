const { Router } = require('express');
const cityController = require('../controllers/city.controller');
const app = Router();

app.post('/create-city',  cityController.createCity);

app.get('/get-all-cities', cityController.getCities);

module.exports = app;
