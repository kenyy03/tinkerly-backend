const mongoose = require('mongoose');
const { config } = require('../config');
const ObjectId = mongoose.Schema.Types.ObjectId;

const jobForUserSchema = new mongoose.Schema(
  {
    jobId: { type: ObjectId, ref: 'job', default: null },
    employeeId: { type: ObjectId, ref: 'user', default: null },
    employerId: { type: ObjectId, ref: 'user', default: null },
    isConfirmedByEmployee: { type: Boolean, default: false },
    isConfirmedByEmployer: { type: Boolean, default: false },
    hourlyRate: { type: Number, default: 0.0},
    serviceFee: { type: Number, default: 0.0},
    status: {
      type: String,
      enum: Object.values(config.JOB_STATUS),
      default: config.JOB_STATUS.PENDING,
    },
    isReviewedByEmployee: { type: Boolean, default: false },
    isReviewedByEmployer: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('jobForUser', jobForUserSchema);