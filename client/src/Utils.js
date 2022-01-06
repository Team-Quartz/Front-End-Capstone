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
};

/*
   QQQ   U   U  EEEEE   SSS  TTTTT  IIIII   OOO   N   N   SSS
  Q   Q  U   U  E      S       T      I    O   O  NN  N  S
  Q Q Q  U   U  EEE     SSS    T      I    O   O  N N N   SSS
  Q  QQ  U   U  E          S   T      I    O   O  N  NN      S
   QQQQ   UUU   EEEEE   SSS    T    IIIII   OOO   N   N   SSS
       Q
 */

// module.exports.parseQuestions

module.exports.fetchQuestions = (productId) => {
  return axios
    .get('/API/qa/questions/', {
      params: {
        product_id: productId,
      },
    })
    .then((response) => {
      return response.data;
    });
}

module.exports.markQuestionHelpful = (questionId) => {
  return axios.put(`/API/qa/questions/${questionId}/helpful`, {
    params: { question_id: questionId },
  });
}

module.exports.markAnswerHelpful = (answerId) => {
  console.log('ANSWER ID: ', answerId)
  return axios.put(`/API/qa/answers/${answerId}/helpful`, {
    params: { id: answerId },
  });
}

module.exports.reportAnswer = (answerId) => {
  return axios.put(`/API/qa/answers/${answerId}/report`, {
    params: { id: answerId },
  });
}