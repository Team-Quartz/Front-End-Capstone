import react from 'react';
import placeholder from './placeholderData.js';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import { Stars } from '../sharedComponents.jsx';
import WriteNewReview from './WriteNewReview.jsx';

const blankState = {
  loadedReviews: [],
  filters: [],
  reviewPage: 0,
  writingNewReview: false,
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

  openWriteNewReview(open) {
    this.setState({
      writingNewReview: open,
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
            <Stars reviewsMeta={this.props.reviewsMeta} />
            <div>100% of reviews recommend this product</div>
            <div className='starsFilters'>
              {[1, 2, 3, 4, 5].map((rating) => (
                <RatingBreakdown
                  rating={rating}
                  count={this.props.reviewsMeta.ratings[rating]}
                  total={this.props.reviewsMeta.totalRatings}
                  key={rating}
                />
              ))}
            </div>
            <ProductBreakdown characteristics={this.props.reviewsMeta.characteristics} />
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
              <button onClick={() => this.openWriteNewReview(true)}>ADD A REVIEW +</button>
            </div>
          </div>
        </div>
        <WriteNewReview
          onClose={() => this.openWriteNewReview(false)}
          show={this.state.writingNewReview}
        />
      </div>
    );
  }
}

export default RatingsAndReviews;
