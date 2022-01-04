import react from 'react';
import placeholder from './placeholderData.js';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import { Stars, FlexRow } from '../sharedComponents.jsx';
import ReviewsList from './ReviewsList.jsx';
import styled from 'styled-components';
import WriteNewReview from './WriteNewReview.jsx';
import utils from '../../Utils.js';

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

  componentDidUpdate(prevProps) {
    if (prevProps.reviewsMeta !== this.props.reviewsMeta) {
      this.loadReviews();
    }
  }

  loadNewProduct() {
    this.setState(blankState);
    this.loadReviews();
  }

  loadReviews() {
    utils
      .fetchReviews(productId, 0, 2, 'newest')
      .then((loadedReviews) => {
        console.log(loadedReviews);
        this.setState((state) => ({
          loadedReviews: state.loadedReviews.concat(loadedReviews),
          reviewPage: ++state.reviewPage,
        }));
      })
      .catch((err) => console.error(err));
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
        <FlexRow>
          <div style={{ flex: 1 }}>
            <FlexRow>
              <div>{this.props.reviewsMeta.averageRating}</div>
              <Stars reviewsMeta={this.props.reviewsMeta} />
            </FlexRow>
            <div>100% of reviews recommend this product</div>
            <div>
              {[1, 2, 3, 4, 5].map((rating) =>
                this.props.reviewsMeta.ratings ? (
                  <RatingBreakdown
                    rating={rating}
                    count={this.props.reviewsMeta.ratings[rating]}
                    total={this.props.reviewsMeta.totalRatings}
                    key={rating}
                  />
                ) : (
                  <RatingBreakdown rating={rating} count={0} total={0} key={rating} />
                )
              )}
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
        <WriteNewReview
          onClose={() => this.openWriteNewReview(false)}
          show={this.state.writingNewReview}
          reviewsMeta={this.props.reviewsMeta}
          product={placeholder.props.currentProduct}
        />
      </div>
    );
  }
}

export default RatingsAndReviews;
