const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    employerId: { type: ObjectId, ref: 'user', default: null },
  },
);

module.exports = mongoose.model('job', jobSchema);