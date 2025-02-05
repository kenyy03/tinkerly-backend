const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobName: { type: String, required: true },
    jobType: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    time: { type: String, default: '' },
    payPerHour: { type: Number, default: 0 },
    payPerService: { type: Number, default: 0 },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, default: 'pending' },
    requirements: { type: Array, default: [] },
    skills: { type: Array, default: [], ref: 'habilities' },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

module.exports = mongoose.model('jobs', jobSchema);