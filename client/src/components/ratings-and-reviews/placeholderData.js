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
      recommend: false,
      response: "Glad you're enjoying the product!",
      body: "They are very dark. But that's good because I'm in very sunny spots",
      date: '2019-06-23T00:00:00.000Z',
      reviewer_name: 'bigbrotherbenjamin',
      helpfulness: 5,
      photos: [],
    },
    // ...
  ],
};

module.exports.props = {
  products: [
    {
      id: 1,
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description:
        'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140',
    },
    {
      id: 2,
      name: 'Bright Future Sunglasses',
      slogan: "You've got to wear shades",
      description:
        "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      category: 'Accessories',
      default_price: '69',
    },
    {
      id: 3,
      name: 'Morning Joggers',
      slogan: 'Make yourself a morning person',
      description:
        "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
      category: 'Pants',
      default_price: '40',
    },
    // ...
  ],
  currentProduct: undefined,
};

const currentProduct = 2;

module.exports.props.products.forEach((product) => {
  if ((product.id === currentProduct)) {
    module.exports.props.currentProduct = product;
  }
});
