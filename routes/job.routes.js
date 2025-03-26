const { Router } = require('express');
const jobController = require('../controllers/job.controller');
const app = Router();

app.post('/job/create', jobController.createJob);

app.post('/job/update', jobController.updateJob);

app.post('/job/insert-abilities', jobController.insertAbilitiesForJob);

app.get('/job/get-jobs-by-employer', jobController.getJobsByEmployer);

app.get('/job/get-abilities', jobController.getAbilitiesByJobId);

module.exports = app;
