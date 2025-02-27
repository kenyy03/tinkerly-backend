const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userAbilitySchema = new mongoose.Schema(
  {
    abilityId: { type: ObjectId, ref: 'abilities', default: null },
    userId: { type: ObjectId, ref: 'user', default: null },
  },
);

module.exports = mongoose.model('userAbility', userAbilitySchema);