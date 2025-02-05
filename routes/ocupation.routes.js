const { Router } = require('express');
const ocupationController = require('../controllers/ocupation.controller');
const app = Router();

app.post('/create-ocupation',  ocupationController.createOcupation);

app.get('/get-all-ocupations', ocupationController.getOcupations);

module.exports = app;
