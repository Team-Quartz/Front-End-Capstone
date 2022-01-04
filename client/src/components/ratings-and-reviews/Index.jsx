import React from 'react';
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
    if (prevState.loadedReviews.length < this.state.loadedReviews.length) {
      //TODO: smooth scrolling
      //TODO: might be redundant with reviewList internal scrollIntoView
      this.reviewsBottom.current.scrollIntoView();
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
            loadedReviews: state.loadedReviews.concat(loadedReviews),
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
      this.state.reviewsRemaining &&
      this.state.loadedReviews.length < this.props.reviewsMeta.totalRatings
    );
  }

  render() {
    if (!this.props.currentProduct) {
      return null;
    }
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
            <div>{this.props.reviewsMeta.totalRatings} reviews, sorted by relevance</div>
            <ReviewsList reviews={this.state.loadedReviews} />
            <div ref={this.reviewsBottom}>
              {this.areUnloadedReviews() ? (
                <button onClick={this.loadReviews.bind(this)}>MORE REVIEWS</button>
              ) : null}
              <button onClick={() => this.openWriteNewReview(true)}>ADD A REVIEW +</button>
            </div>
          </div>
        </FlexRow>
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
