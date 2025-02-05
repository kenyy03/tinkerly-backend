const mongooose = require('mongoose');

const roleSchema = new mongooose.Schema(
  {
    description: { type: String, required: true },
  },
);

module.exports = mongooose.model('roles', roleSchema);