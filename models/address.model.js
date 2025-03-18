const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new mongoose.Schema(
  {
    cityId: { type: ObjectId, ref: 'city', default: null },
    neighborhood: { type: String, required: true },
    directions: { type: String, default: ''},
    userId: { type: ObjectId, ref: 'user', default: null },
    jobId: { type: ObjectId, ref: 'job', default: null },
  },
);

module.exports = mongoose.model('address', addressSchema);