import react from 'react';
import placeholder from './placeholderData.js';
import RatingBreakdown from './RatingBreakdown.jsx';

const blankState = {
  loadedReviews: [],
  filters: [],
  reviewPage: 0,
};

class RatingsAndReviews extends react.Component {
  constructor(props) {
    super(props);
    this.state = blankState;
  }

  componentDidMount() {
    this.loadNewProduct();
  }

  loadNewProduct() {
    this.setState(blankState);
    this.loadReviews();
  }

  loadReviews() {
    this.setState((state, props) => {
      const reviewPage = ++state.reviewPage;
      const loadedReviews = state.loadedReviews.concat(placeholder.reviews.results);
      return { loadedReviews, reviewPage };
    });
  }

  render() {
    return (
      <div>
        <h2>Ratings &amp; Reviews</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div className='starsAndBars'>
            {/** replace with stars component */}
            <div>3.5 * * * _ _</div>
            <div>100% of reviews recommend this product</div>
            <div className='starsFilters'>
              {[1, 2, 3, 4, 5].map((rating) => (
                <RatingBreakdown
                  rating={rating}
                  count={placeholder.props.reviewsMeta.ratings[rating]}
                  total={placeholder.props.reviewsMeta.totalRatings}
                  key={rating}
                />
              ))}
            </div>
            <div></div>
          </div>
          <div className='reviewsList'>
            <div>248 reviews, sorted by relevance</div>
            <div>
              {this.state.loadedReviews.map((review) => (
                <div key={review.review_id}>{review.summary}</div>
              ))}
            </div>
            <div>
              <button>MORE REVIEWS</button>
              <button>ADD A REVIEW +</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
