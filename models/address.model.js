const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new mongoose.Schema(
  {
    cityId: { type: ObjectId, ref: 'city', default: null },
    userId: { type: ObjectId, ref: 'user', default: null },
    neighborhood: { type: String, required: true },
    comments: { type: String, default: ''}
  },
);

module.exports = mongoose.model('address', addressSchema);