const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const jobAbilitySchema = new mongoose.Schema(
  {
    abilityId: { type: ObjectId, ref: 'abilities', default: null },
    jobId: { type: ObjectId, ref: 'job', default: null },
  },
);

module.exports = mongoose.model('jobAbility', jobAbilitySchema);