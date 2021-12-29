module.exports.reviews = {
  product: '2',
  page: 0,
  count: 5,
  results: [
    {
      review_id: 5,
      rating: 3,
      summary: "I'm enjoying wearing these shades",
      recommend: false,
      response: null,
      body: 'Comfortable and practical.',
      date: '2019-04-14T00:00:00.000Z',
      reviewer_name: 'shortandsweeet',
      helpfulness: 5,
      photos: [
        {
          id: 1,
          url: 'urlplaceholder/review_5_photo_number_1.jpg',
        },
        {
          id: 2,
          url: 'urlplaceholder/review_5_photo_number_2.jpg',
        },
        // ...
      ],
    },
    {
      review_id: 3,
      rating: 4,
      summary: 'I am liking these glasses',
      recommend: true,
      response: "Glad you're enjoying the product!",
      body: "This is some example review text that is very long. It should display no more than 250 characters, broken between words, with a clickable option to see the rest of the review if the user so chooses. The rest of this text is some nonsese stream-of-consciousness to fill space. I could take notes in here if I wanted even, maybe I'll hide an engineering journal entry in this text, nobody would know. It would be my little secret. Anyways, great sunglasses!",
      date: '2019-06-23T00:00:00.000Z',
      reviewer_name: 'bigbrotherbenjamin',
      helpfulness: 5,
      photos: [],
    },
    // ...
  ],
};

module.exports.props = {
  currentProduct: '2',
};
