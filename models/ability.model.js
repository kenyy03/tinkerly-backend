const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const abilitiesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
);

module.exports = mongoose.model('abilities', abilitiesSchema);