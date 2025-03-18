const { Router } = require('express');
const jobController = require('../controllers/job.controller');
const app = Router();

app.post('/job/create', jobController.createJob);

app.get('/job/get-jobs-by-employer', jobController.getJobsByEmployer);

// app.get('/get-address-by-job-id', addressController.getAddressByJobId);

module.exports = app;
