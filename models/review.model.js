const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: { type: ObjectId, ref: 'user', default: null },
    reviewedId: { type: ObjectId, ref: 'user', default: null },
    rating: { type: Number, default: 0.0 },
    comment: { type: String, default: ''},
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('review', reviewSchema);