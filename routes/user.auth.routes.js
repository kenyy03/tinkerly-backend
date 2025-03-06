const { Router } = require('express');
const authController = require('../controllers/user.auth.controller');
const verifySignUp = require('../middlewares/verify.signup.middleware');
const verifyJwt = require('../middlewares/verify.jwt.middleware');
const app = Router();

app.post('/signup', [verifySignUp.verifyDuplicateEmail], authController.signUp);

app.post('/login', authController.logIn);

app.put('/update-user', authController.updateUser);

app.put('/change-image-profile', authController.changeImageProfile);

app.put('/public-profile', authController.publicProfile);

app.get('/user-by-id', authController.getUserById);

app.get('/get-users-by-is-public-profile', authController.getUsersByIsPublicProfile);

app.get('/get-public-users-for-resume', authController.getPublicUsersForResume);

module.exports = app;
