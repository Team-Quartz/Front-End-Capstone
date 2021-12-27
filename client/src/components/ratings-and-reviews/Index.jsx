import react from 'react';

class RatingsAndReviews extends react.Component {
  constructor(props) {
    super(props);
    this.state={
      loadedReviews: [],
      filters: []
    }
  }

  render() {
    return (
      <div>
        <h2>Ratings &amp; Reviews</h2>
        <div>
          <div className='starsAndBars'>
            <div>3.5 * * * _ _</div>{/** replace with stars component */}
            <div>100% of reviews recommend this product</div>
            <div className='starsFilters'>
              <div>5 stars ---------____</div>
              <div>4 stars -------______</div>
              <div>3 stars -------------</div>
              <div>2 stars ---------____</div>
              <div>1 stars ----_________</div>
            </div>
            <div>

            </div>
          </div>
          <div className='reviewsList'>
            <div>248 reviews, sorted by relevance</div>
            <div>
              {/* reviews list */}
            </div>
            <div>
              <button>MORE REVIEWS</button>
              <button>ADD A REVIEW +</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RatingsAndReviews;