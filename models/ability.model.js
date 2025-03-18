const mongoose = require('mongoose');

const abilitiesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
);

module.exports = mongoose.model('abilities', abilitiesSchema);