const axios = require('axios');

/**
 * modifies the reviews meta data to include total reviews count and average score
 * @param {object} reviewsMeta the data object, from placeholder data or a GET request
 * @returns mutated reviewsMeta object
 */
parseReviewsMeta = (reviewsMeta) => {
  reviewsMeta.totalRatings = 0;
  let ratingSum = 0;
  Object.entries(reviewsMeta.ratings).forEach((rating) => {
    reviewsMeta.totalRatings += Number.parseInt(rating[1]);
    ratingSum += Number.parseInt(rating[0]) * Number.parseInt(rating[1]);
  });
  if (reviewsMeta.totalRatings > 0) {
    reviewsMeta.averageRating = ratingSum / reviewsMeta.totalRatings;
  }
  return reviewsMeta;
};

module.exports.parseReviewsMeta = parseReviewsMeta;

module.exports.fetchProduct = (productId) => {
  return axios.get(`/API/products/${productId}`).then((response) => response.data);
};

module.exports.fetchReviewsMeta = (productId) => {
  return axios
    .get('API/reviews/meta/', {
      params: {
        product_id: productId,
      },
    })
    .then((response) => parseReviewsMeta(response.data));
};

module.exports.fetchReviews = (productId, page, count, sort) => {
  return axios
    .get('/API/reviews/', {
      params: {
        product_id: productId,
        page,
        count,
        sort,
      },
    })
    .then((response) => response.data.results);
};
