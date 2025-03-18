const Review = require('../models/review.model');

exports.createReview = async (req, res) => {
  try {
    const { reviewedId, reviewerId, rating, comment } = req.body;

    const review = new Review({ reviewedId, reviewerId, rating, comment });
    const savedReview = await review.save();
    const reviewResponse = { ...savedReview._doc }
    res.status(200).json({ message: 'Review created', data: reviewResponse });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the review',
    });
  }
};

exports.getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const reviews = await Review.find( { reviewedId: userId } )
        .populate({ path: 'reviewerId', select: '-password', populate: { path: 'roleId' } })
        .lean();
    console.log(reviews);
    res.status(200).json({ message: 'Success getting reviews', data: reviews });
    return;
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};