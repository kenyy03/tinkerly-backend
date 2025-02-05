const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: '' },
    phone: { type: String, required: true },
    roleId: { type: ObjectId, ref: 'roles', default: null },
    description: { type: String, default: ''},
    imageProfile: { 
      publicId: { type: String, default: '' },
      url: { type: String, default: '' }
     },
  },
);

module.exports = mongoose.model('user', userSchema);