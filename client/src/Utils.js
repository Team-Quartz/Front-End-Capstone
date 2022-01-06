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
    reviewsMeta.totalRatings += parseInt(rating[1]);
    ratingSum += parseInt(rating[0]) * parseInt(rating[1]);
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

module.exports.fetchStyles = (productId) => {
  return axios
    .get(`/API/products/${productId}/styles`);
}
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

module.exports.markReviewHelpful = (reviewId) => {
  return axios.put(`/API/reviews/${reviewId}/helpful`, {
    params: { review_id: reviewId },
  });
};

module.exports.markReviewReported = (reviewId) => {
  return axios.put(`/API/reviews/${reviewId}/report`, {
    params: { review_id: reviewId },
  });
};

module.exports.scrollIntoView = (ref) => {
  ref.current.scrollIntoView({ behavior: 'smooth' });
};

module.exports.submitReview = (
  product_id,
  rating,
  summary,
  body,
  recommend,
  name,
  email,
  photos,
  characteristics
) => {
  const requestBody = {
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics,
  };
  return axios.post('/API/reviews', requestBody);
  /*
  I don't even have the glasses, but they look neat. Anyways burritos are pretty cool, I'd like to recommend them.
  */
};

module.exports.fetchQuestions = () => {

}