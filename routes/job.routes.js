const { Router } = require('express');
const jobController = require('../controllers/job.controller');
const app = Router();

app.post('/job/create', jobController.createJob);

app.post('/job/update', jobController.updateJob);

app.post('/job/insert-abilities', jobController.insertAbilitiesForJob);

app.get('/job/get-jobs-by-employer', jobController.getJobsByEmployer);

app.get('/job/get-abilities', jobController.getAbilitiesByJobId);

app.get('/job/get-invitations-by-employee', jobController.getJobForUserByEmployee);

app.get('/job/get-invitations-by-employer', jobController.getJobForUserByEmployer);

app.post('/job/create-for-user', jobController.createJobForUser);

app.post('/job/update-for-user', jobController.updateJobForUser);


module.exports = app;
