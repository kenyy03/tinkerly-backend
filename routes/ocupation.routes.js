const { Router } = require('express');
const ocupationController = require('../controllers/ocupation.controller');
const app = Router();

app.post('/create-ocupation',  ocupationController.createOcupation);

app.get('/get-all-ocupations', ocupationController.getOcupations);

app.post('/ocupation/assign-ocupation-to-user', ocupationController.assignOcupationToUser);

app.get('/ocupation/get-ocupation-by-user', ocupationController.getOcupationByUserId);

module.exports = app;
