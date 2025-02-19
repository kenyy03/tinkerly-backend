const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const config = require('./config/index').config;
const urlPrefix = config.URL_PREFIX || '/api/v1';

app.use(express.urlencoded({ extended: true, limit: '100bm' }));
app.use(express.json(limit = '50mb'));
app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000']}))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: "File size limit has been reached"
}))

// Routes
const authRoutes = require('./routes/user.auth.routes');
const roleRoutes = require('./routes/role.routes')
const cityRoutes = require('./routes/city.routes')
const ocupationsRoutes = require('./routes/ocupation.routes')
const addressRoutes = require('./routes/adress.routes')

app.use(urlPrefix, [
  authRoutes,
  roleRoutes,
  cityRoutes,
  ocupationsRoutes,
  addressRoutes
]);

module.exports = app;