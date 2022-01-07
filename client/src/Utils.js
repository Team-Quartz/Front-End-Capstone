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

module.exports.fetchQuestions = (productId, page, count) => {
  return axios.get('/API/qa/questions/', {
      params: {
        product_id: productId,
        page,
        count,
      },
    })
    .then((response) => {
      return response.data;
    });
}

module.exports.fetchAnswers = (questionId) => {
  return axios.get(`/API/qa/questions/${questionId}/answers`)
    .then((response) => {
      return response.data.results;
    });
    // .catch(() => {console.log('SERVER: THERE WAS AN ERROR RETRIEVING THE ANSWERS')})
}

module.exports.markQuestionHelpful = (questionId) => {
  return axios.put(`/API/qa/questions/${questionId}/helpful`, {
    params: { question_id: questionId },
  });
}

module.exports.markAnswerHelpful = (answerId) => {
  return axios.put(`/API/qa/answers/${answerId}/helpful`, {
    params: { answer_id: answerId },
  });
}

module.exports.reportAnswer = (answerId) => {
  return axios.put(`/API/qa/answers/${answerId}/report`, {
    params: { answer_id: answerId },
  });
}

module.exports.submitQuestion = (body, name, email, productId) => {
  const params = {
    body,
    name,
    email,
    product_id: productId,
  }
  return axios.post('/API/qa/questions/', params);
}

module.exports.submitAnswer = (body, name, email, photos, questionId) => {
  const params = {
    body,
    name,
    email,
    photos
  }
  return axios.post(`/API/qa/questions/${questionId}/answers`, params);
}

