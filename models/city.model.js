const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    description: { type: String, require: true}
  },
);

module.exports = mongoose.model('city', citySchema);