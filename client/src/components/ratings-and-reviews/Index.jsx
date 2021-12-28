import react from 'react';
import placeholder from './placeholderData.js';
import ProductBreakdown from './ProductBreakdown.jsx';

const blankState = {
  loadedReviews: [],
  filters: [],
  reviewPage: 0,
};

class RatingsAndReviews extends react.Component {
  constructor(props) {
    super(props);
    this.state = blankState;
    this.placeholderProps = {
      reviewsMeta: this.loadMeta(),
    }
  }

  componentDidMount() {
    this.loadNewProduct();
    this.loadReviews();
  }

  loadNewProduct() {
    //TODO: get current product from props
    this.setState(blankState);
  }

  loadReviews() {
    //TODO: get current product from props
    this.setState((state, props) => {
      const reviewPage = ++state.reviewPage;
      const loadedReviews = state.loadedReviews.concat(placeholder.reviews.results);
      return { loadedReviews, reviewPage };
    });
  }

  loadMeta() {
    //TODO: get current product from props
    return placeholder.reviewsMeta;
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
              <div>5 stars ---------____</div>
              <div>4 stars -------______</div>
              <div>3 stars -------------</div>
              <div>2 stars ---------____</div>
              <div>1 stars ----_________</div>
            </div>
            <ProductBreakdown characteristics={this.placeholderProps.reviewsMeta.characteristics}/>
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
