const mongoose = require('mongoose');
const config = require('./index').config;
require('dotenv').config();
const ATLAS_URI = `mongodb+srv://${config.ATLAS_USERNAME}:${config.ATLAS_PASSWORD}@clustervanguardia.5drt9oa.mongodb.net/${config.ATLAS_DATABASE}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

exports.connect = () => {
  mongoose
    .connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};