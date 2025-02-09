const { Router } = require('express');
const roleController = require('../controllers/role.controller');
const app = Router();

app.post('/create-role',  roleController.createRole);

app.get('/get-all-roles', roleController.getRoles);

module.exports = app;
