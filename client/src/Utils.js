/**
 * modifies the reviews meta data to include total reviews count and average score
 * @param {object} reviewsMeta the data object, from placeholder data or a GET request
 * @returns mutated reviewsMeta object
 */
module.exports.parseReviewsMeta = (reviewsMeta) => {
  reviewsMeta.totalRatings = 0;
  let ratingSum = 0;
  Object.entries(reviewsMeta.ratings).forEach((rating) => {
    reviewsMeta.totalRatings += parseInt(rating[1]);
    ratingSum += parseInt(rating[0]) * parseInt(rating[1]);
  });
  if (reviewsMeta.totalRatings > 0) {
    reviewsMeta.averageRating = ratingSum / reviewsMeta.totalRatings;
  }
  return reviewsMeta;
};

