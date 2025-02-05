const { Router } = require('express');
const roleController = require('../controllers/role.controller');
const app = Router();

app.post('/create',  roleController.createRole);

app.get('/get-all', roleController.getRoles);

module.exports = app;
