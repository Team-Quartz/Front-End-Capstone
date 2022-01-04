import react from 'react';
import placeholder from './placeholderData.js';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import { Stars, FlexRow } from '../sharedComponents.jsx';
import ReviewsList from './ReviewsList.jsx';
import styled from 'styled-components';
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
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        > */}
        <FlexRow>
          <div className='starsAndBars'>
            {/* <FlexRow> */}
              <div>{this.props.reviewsMeta.averageRating}</div>
              <Stars reviewsMeta={this.props.reviewsMeta} />
            {/* </FlexRow> */}
            <div>100% of reviews recommend this product</div>
            <div>
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
          <div style={{ flex: 2 }}>
            <div>248 reviews, sorted by relevance</div>
            <ReviewsList reviews={this.state.loadedReviews} />
            <div>
              <button>MORE REVIEWS</button>
              <button onClick={() => this.openWriteNewReview(true)}>ADD A REVIEW +</button>
            </div>
          </div>
        </FlexRow>
      </div>
    );
  }
}

export default RatingsAndReviews;
