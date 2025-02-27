const { Router } = require('express');
const abilityController = require('../controllers/ability.controller');
const app = Router();

app.post('/insert-abilities-for-user',  abilityController.insertAbilitiesForUser);

app.post('/insert-abilities',  abilityController.insertAbilities);

app.get('/get-abilities-by-user-id', abilityController.getAbilitiesByUserId);

app.get('/get-all-abilities', abilityController.getAllAbilities);

module.exports = app;
