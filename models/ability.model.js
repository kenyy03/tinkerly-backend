const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const abilitiesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, unique: true },
    userId: { type: ObjectId, ref: 'user', default: null },
  },
);

module.exports = mongoose.model('abilities', abilitiesSchema);