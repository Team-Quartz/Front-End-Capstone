import React from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import { Stars, FlexRow, TextButton, SelectStyled , BodyText, Title, BodyLabel} from '../sharedComponents.jsx';
import ReviewsList from './ReviewsList.jsx';
import styled from 'styled-components';
import WriteNewReview from './WriteNewReview.jsx';
import utils from '../../Utils.js';

const defaultFilters = [true, false, false, false, false, false];

const blankState = {
  //TODO: should we persist reviewSorting and filters when product changes?
  reviewSorting: 'relevant',
  filters: defaultFilters,
  reviews: null,
  reviewPage: 0,
  writingNewReview: false,
  reviewsRemaining: true,
  minReviewsHeight: 0,
};
class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState;
    this.reviewsBottom = React.createRef();
    this.reviewsFrame = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reviewsMeta !== this.props.reviewsMeta) {
      this.loadNewProduct();
    } else if (
      this.state.reviewPage > 1 &&
      this.state.reviews &&
      (!prevState.reviews || prevState.reviews.length < this.state.reviews.length)
    ) {
      utils.scrollIntoView(this.reviewsBottom);
    }

    if (this.reviewsFrame.current) {
      const clientHeight = this.reviewsFrame.current.clientHeight;
      if (clientHeight > this.state.minReviewsHeight) {
        this.setState({ minReviewsHeight: clientHeight });
      }
    }
  }

  updateReviewSorting(reviewSorting) {
    this.setState((state) => {
      if (reviewSorting != state.reviewSorting) {
        this.loadReviews(0);
        return { reviewSorting, reviews: null, reviewsRemaining: true };
      }
    });
  }

  loadNewProduct() {
    this.setState(blankState);
    this.loadReviews(0);
  }

  loadReviews(reviewPage = this.state.reviewPage) {
    utils
      .fetchReviews(this.props.reviewsMeta.product_id, reviewPage + 1, 2, this.state.reviewSorting)
      .then((loadedReviews) => {
        if (loadedReviews.length === 0) {
          //TODO: remove button as soon as last review is loaded
          const newState = { reviewsRemaining: 0 };
          if (reviewPage === 0) {
            newState.reviews = [];
          }
          this.setState(newState);
        } else {
          this.setState((state) => ({
            reviews: state.reviews ? state.reviews.concat(loadedReviews) : loadedReviews,
            reviewPage: reviewPage + 1,
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

  toggleRatingFilter(rating) {
    const filters = this.state.filters.slice();
    filters[rating] = !filters[rating];
    filters[0] = filters.slice(1).every((filter) => !filter);
    this.setState({ filters });
  }

  clearRatingFilters() {
    this.setState({ filters: defaultFilters });
  }

  render() {
    const isLoading = this.props.reviewsMeta.totalRatings === undefined;
    const noReviews = this.props.reviewsMeta.totalRatings === 0;
    if (!this.props.currentProduct) {
      return null;
    }
    return (
      <div ref={this.reviewsFrame} style={{ minHeight: this.state.minReviewsHeight }}>
        <Title>Ratings &amp; Reviews</Title>
        {!isLoading ? (
          <FlexRow>
            <div style={{ flex: 1 }}>
              <FlexRow>
                <div>
                  {noReviews ? '' : Math.round(this.props.reviewsMeta.averageRating * 4) / 4}
                </div>
                <Stars reviewsMeta={this.props.reviewsMeta} />
              </FlexRow>
              {noReviews ? null : (
                <BodyText>
                  {Math.round(
                    (this.props.reviewsMeta.recommended.true /
                      this.props.reviewsMeta.totalRatings) *
                      100
                  )}
                  % of reviews recommend this product
                </BodyText>
              )}
              <div>
                {[1, 2, 3, 4, 5].map((rating) =>
                  !noReviews ? (
                    <RatingBreakdown
                      rating={rating}
                      count={this.props.reviewsMeta.ratings[rating]}
                      total={this.props.reviewsMeta.totalRatings}
                      key={rating}
                      toggleFilter={this.toggleRatingFilter.bind(this)}
                      filter={this.state.filters[rating]}
                    />
                  ) : (
                    <RatingBreakdown rating={rating} count={0} total={0} key={rating} />
                  )
                )}
              </div>
              <div>
                {this.state.filters[0] ? null : (
                  <div>
                    Filtering on {[1, 2, 3, 4, 5].filter((i) => this.state.filters[i]).join(', ')}{' '}
                    stars
                    <TextButton onClick={this.clearRatingFilters.bind(this)}>
                      Clear all filters
                    </TextButton>
                  </div>
                )}
              </div>
              <ProductBreakdown characteristics={this.props.reviewsMeta.characteristics} />
            </div>
            <div style={{ flex: 2 }}>
              <div>
                <BodyLabel htmlFor='sortReviews'>{this.props.reviewsMeta.totalRatings} reviews, sorted by </BodyLabel>
                <SelectStyled
                  id='sortReviews'
                  name='sort reviews'
                  value={this.state.reviewSorting}
                  onChange={(e) => this.updateReviewSorting(e.target.value)}
                >
                  <option value={'relevant'}>relevance</option>
                  <option value={'newest'}>date</option>
                  <option value={'helpful'}>helpfulness</option>
                </SelectStyled>
              </div>
              <ReviewsList
                reviews={this.state.reviews}
                reviewPage={this.state.reviewPage}
                filters={this.state.filters}
              />
              <div style={{ position: 'relative' }} ref={this.reviewsBottom}>
                <TextButton onClick={() => this.openWriteNewReview(true)}>
                  ADD A REVIEW +
                </TextButton>
                {this.areUnloadedReviews() ? (
                  <TextButton
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    onClick={() => this.loadReviews()}
                  >
                    MORE REVIEWS
                  </TextButton>
                ) : null}
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
