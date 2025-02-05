const mongoose = require('mongoose');

const ocupationchema = new mongoose.Schema(
  {
    description: { type: String, required: true},
  },
);

module.exports = mongoose.model('ocupation', ocupationchema);