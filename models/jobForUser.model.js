const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const jobForUserSchema = new mongoose.Schema(
  {
    jobId: { type: ObjectId, ref: 'job', default: null },
    employeeId: { type: ObjectId, ref: 'user', default: null },
    employerId: { type: ObjectId, ref: 'user', default: null },
    isConfirmedByEmployee: { type: Boolean, default: false },
    isConfirmedByEmployer: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('jobForUser', jobForUserSchema);