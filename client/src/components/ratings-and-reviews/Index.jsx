import React from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import { Stars, FlexRow } from '../sharedComponents.jsx';
import ReviewsList from './ReviewsList.jsx';
import styled from 'styled-components';
import WriteNewReview from './WriteNewReview.jsx';
import utils from '../../Utils.js';

const blankState = {
  reviews: null,
  filters: [],
  reviewPage: 0,
  writingNewReview: false,
  reviewsRemaining: true,
};
class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState;
    this.reviewsBottom = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reviewsMeta !== this.props.reviewsMeta) {
      this.loadReviews();
    }
    if (
      this.state.reviews &&
      (!prevState.reviews || prevState.reviews.length < this.state.reviews.length)
    ) {
      this.scrollIntoView(this.reviewsBottom);
    }
  }

  loadNewProduct() {
    this.setState(blankState);
    this.loadReviews();
  }

  loadReviews() {
    utils
      .fetchReviews(this.props.reviewsMeta.product_id, this.state.reviewPage + 1, 2, 'relevance')
      .then((loadedReviews) => {
        if (loadedReviews.length === 0) {
          //TODO: remove button as soon as last review is loaded
          this.setState({ reviewsRemaining: 0 });
        } else {
          this.setState((state) => ({
            reviews: state.reviews ? state.reviews.concat(loadedReviews) : loadedReviews,
            reviewPage: ++state.reviewPage,
          }));
        }
      })
      .catch((err) => console.error(err));
  }

  openWriteNewReview(open) {
    this.setState({
      writingNewReview: open,
    });
  }

  areUnloadedReviews() {
    return (
      this.state.reviews &&
      this.state.reviewsRemaining &&
      this.state.reviews.length < this.props.reviewsMeta.totalRatings
    );
  }

  scrollIntoView(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    if (!this.props.currentProduct) {
      return null;
    }
    return (
      <div>
        <h2>Ratings &amp; Reviews</h2>
        {this.props.reviewsMeta.averageRating ? (
          <FlexRow>
            <div style={{ flex: 1 }}>
              <FlexRow>
                <div>{Math.round(this.props.reviewsMeta.averageRating * 4) / 4}</div>
                <Stars reviewsMeta={this.props.reviewsMeta} />
              </FlexRow>
              <div>
                {Math.round(
                  (this.props.reviewsMeta.recommended.true / this.props.reviewsMeta.totalRatings) *
                    100
                )}
                % of reviews recommend this product
              </div>
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
              <div>{this.props.reviewsMeta.totalRatings} reviews, sorted by relevance</div>
              <ReviewsList reviews={this.state.reviews} scrollIntoView={this.scrollIntoView} />
              <div ref={this.reviewsBottom}>
                {this.areUnloadedReviews() ? (
                  <button onClick={this.loadReviews.bind(this)}>MORE REVIEWS</button>
                ) : null}
                <button onClick={() => this.openWriteNewReview(true)}>ADD A REVIEW +</button>
              </div>
            </div>
          </FlexRow>
        ) : null}
        <WriteNewReview
          onClose={() => this.openWriteNewReview(false)}
          show={this.state.writingNewReview}
          reviewsMeta={this.props.reviewsMeta}
          currentProduct={this.props.currentProduct}
        />
      </div>
    );
  }
}

export default RatingsAndReviews;
