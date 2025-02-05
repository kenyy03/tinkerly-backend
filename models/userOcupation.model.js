const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Decimal = mongoose.Schema.Types.Decimal128;

const userOcupationSchema = new mongoose.Schema(
  {
    ocupationId: { type: ObjectId, ref: 'ocupation', default: null },
    userId: { type: ObjectId, ref: 'user', default: null },
    hourlyRate: { type: Decimal, default: 0.0},
    serviceFee: { type: Decimal, default: 0.0},
  },
);

module.exports = mongoose.model('userOcupation', userOcupationSchema);