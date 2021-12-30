import utils from './Utils.js';

//TODO: parseReviewsMeta should eventually be called in the ajax function that gets this data
//(whether it's for the current product or related ones)
export const reviewsMeta = utils.parseReviewsMeta({
  product_id: '2',
  ratings: {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  recommended: {
    0: 5,
    // ...
  },
  characteristics: {
    Size: {
      id: 14,
      value: '4.0000',
    },
    Width: {
      id: 15,
      value: '3.5000',
    },
    Comfort: {
      id: 16,
      value: '4.0000',
    },
    // ...
  },
});
